package area42.area.MainPage;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;

import area42.area.Action;
import area42.area.Events.SwipeListener;
import area42.area.Interface.IDisplay;
import area42.area.Interface.IFragmentInteraction;
import area42.area.R;
import area42.area.Utils.RegisterData;
import area42.area.Utils.RequestHttp;
import area42.area.Utils.RouteData;
import area42.area.Utils.RouteEnum;

public class HomePage extends AppCompatActivity implements IFragmentInteraction, IDisplay {
    ArrayList<String> url = new ArrayList<>();
    ArrayList<String> txt = new ArrayList<>();
    ArrayList<Integer> _fragmentsId = new ArrayList<>();
    ArrayList<Fragment> _fragments = new ArrayList<>();
    FloatingActionButton _add;
    public RequestHttp request;
    HomePage _page;
    private RouteData _routeData;
    private RegisterData _dataUser;
    private JSONArray allArea;
    private String _token;
    int pos = 0;

    private BottomNavigationView.OnNavigationItemSelectedListener changeMainFragment
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {

            // CHANGE FRAGMENT FROM MENU

            if (_fragmentsId.contains(item.getItemId())) {
                int new_pos = _fragmentsId.indexOf(item.getItemId());
                if (new_pos > pos) {
                    getSupportFragmentManager().beginTransaction().setCustomAnimations(R.anim.slide_new_to_left, R.anim.slide_actual_to_left).replace(R.id.fragment, _fragments.get(new_pos)).commit();
                }
                else if (new_pos < pos) {
                    getSupportFragmentManager().beginTransaction().setCustomAnimations(R.anim.slide_new_to_right, R.anim.slide_actual_to_right).replace(R.id.fragment, _fragments.get(new_pos)).commit();
                }
                if (_fragments.get(new_pos) instanceof FragmentRecycler) {
                    _add.show();
                }
                else {
                    _add.hide();
                }
                pos = new_pos;
                return true;
            }
            return false;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_page);
        _page = this;


        //Recup Params
        Bundle arg = getIntent().getExtras();
        _routeData = (RouteData) arg.get("RouteData");
        _dataUser = (RegisterData) arg.get("DataRegister");
        _token = (String) arg.get("token");
        final String token = arg.getString("token");
        _token = token;

        try {
            request = new RequestHttp(this);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        //Toast.makeText(this, _dataUser.getAccessToken(), Toast.LENGTH_LONG).show();
        request.setToken(token);
        try {
            request.doGetRequest(_routeData.getRouteGet(RouteEnum.GET.AREA.ordinal()), "");
        } catch (IOException e) {
            e.printStackTrace();
        }

        BottomNavigationView navigation = (BottomNavigationView) findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(changeMainFragment);

        _add = (FloatingActionButton) findViewById(R.id.add);
        _add.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View v) {
                Intent intentAction = new Intent(_page, Action.class);
                intentAction.putExtra("Type", "Action");
                intentAction.putExtra("RouteData", _routeData);
                intentAction.putExtra("token", _token);
                intentAction.putExtra("DataRegister", _dataUser);
                startActivity(intentAction);
            }
        });

        //request ici

        // PUT YOUR FRAGMENTS
        _fragments.add(FragmentRecycler.newInstance(null, null, txt));
        _fragments.add(FragmentConfig.newInstance(token, _routeData));

        _fragmentsId.add(R.id.navigation_home);
        _fragmentsId.add(R.id.navigation_account);


        // DEFINE FIRST FRAGMENT TO DISPLAY
        if (getSupportFragmentManager().findFragmentById(R.id.fragment) == null) {
            /*RequestHttp request = null;
            try {
                request = new RequestHttp(_page);
                request.setToken(_token);
                request.doGetRequest(_routeData.getRouteGet(RouteEnum.GET.AREA.ordinal()), "");
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }*/
            getSupportFragmentManager().beginTransaction().add(R.id.fragment, _fragments.get(0)).commit();

        } else if (getSupportFragmentManager().findFragmentById(R.id.fragment) instanceof FragmentConfig){
            pos = 1;
            _add.hide();
        }

        //url.add("https://en.bitcoin.it//w//images//en//2//29//BC_Logo_.png");

        //((FragmentRecycler)_fragments.get(0)).update(null, txt);
    }

    @Override
    public void launchActivityFromLogo(int posService, int numberPageRecycler) {
        int recupNbr = posService + (numberPageRecycler * 10) - (numberPageRecycler);
        overridePendingTransition( R.anim.slide_down_to_up, R.anim.no_slide );
        if (txt != null && recupNbr <  txt.size()) {

            try {
                JSONObject myArea =  allArea.getJSONObject(recupNbr);
                Intent i2 = new Intent(_page, AreaInformation.class);
                i2.putExtra("DataRegister", (RegisterData)getIntent().getExtras().get("DataRegister"));
                i2.putExtra("RouteData", (RouteData)getIntent().getExtras().get("RouteData"));
                i2.putExtra("token", _token);
                i2.putExtra("area", myArea.toString());
                startActivity(i2);

            } catch (JSONException e) {
                e.printStackTrace();
            }
            //Intent intentSignUp = new Intent(this, serviceDisplay.class);
            //startActivity(intentSignUp);
        }
    }

    @Override
    public void changeFragmentByDirection(SwipeListener.Direction x) {

        //DEFINE EVENTS

        if (pos >= 1 && pos - 1 >= 0 &&  x == SwipeListener.Direction.right) {
                pos -= 1;
            ((BottomNavigationView) findViewById(R.id.navigation)).setSelectedItemId(_fragmentsId.get(pos));
            if (_fragments.get(pos) instanceof FragmentRecycler) {
                _add.show();
            }
            else {
                _add.hide();
            }
            getSupportFragmentManager().beginTransaction().setCustomAnimations(R.anim.slide_new_to_right, R.anim.slide_actual_to_right).replace(R.id.fragment, _fragments.get(pos)).commit();
        }
        if (pos >= 0 && pos + 1 != _fragments.size() && x == SwipeListener.Direction.left) {
            pos += 1;
            ((BottomNavigationView) findViewById(R.id.navigation)).setSelectedItemId(_fragmentsId.get(pos));
            if (_fragments.get(pos) instanceof FragmentRecycler) {
                _add.show();
            }
            else {
                _add.hide();
            }
            getSupportFragmentManager().beginTransaction().setCustomAnimations(R.anim.slide_new_to_left, R.anim.slide_actual_to_left).replace(R.id.fragment, _fragments.get(pos)).commit();
        }

    }

    @Override
    public void treatRequestHttp(int code, String res, String url) {
        //Toast.makeText(_page, "Result : " + res, Toast.LENGTH_LONG).show();
        //TODO Get all Area name and display OR Get user profile

        System.out.println("REEEER " + res);
        String nameArea = "";
//        ArrayList<String> allNameArea = new ArrayList<>();
        JSONObject jObject = null;
        try {
            jObject = new JSONObject(res);
            allArea = jObject.getJSONArray("areas");
            //JSONArray xd = new JSONArray(res);

            for (int i = 0; i < allArea.length(); i++) {
                JSONObject myArea =  allArea.getJSONObject(i);
                nameArea = myArea.getString("name");
                System.out.println("ICIICI " + nameArea);
                txt.add(nameArea);
            }
            Log.wtf("All_name_services : ", nameArea);

        } catch (JSONException e) {
            e.printStackTrace();
            System.out.println("REEEERRRROOOORRR");
        }

        ((FragmentRecycler)_fragments.get(0)).update();
        System.out.println("ICIICI " + String.valueOf(txt.size()));
    }
}
