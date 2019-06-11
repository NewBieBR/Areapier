package area42.area;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Iterator;

import area42.area.Events.SwipeListener;
import area42.area.Interface.IDisplay;
import area42.area.Interface.IFragmentInteraction;
import area42.area.MainPage.FragmentRecycler;
import area42.area.Utils.RegisterData;
import area42.area.Utils.RequestHttp;
import area42.area.Utils.RouteData;
import area42.area.Utils.RouteEnum;

public class Action extends AppCompatActivity implements IFragmentInteraction, IDisplay {
    private ArrayList<String> url = new ArrayList<>();
//    private RegisterData dataUser;
    private RouteData routeData;
    private String _token;
    private ArrayList<JSONObject> _allServices = new ArrayList<>();
    private RegisterData _dataUser;
    private String _NewAreaAction;
    String _type;
    Action _page;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_action);
        _page = this;

        //Récupérer les arguments
        Bundle arg = getIntent().getExtras();
        _dataUser = (RegisterData) arg.get("DataRegister");
        routeData = (RouteData) arg.get("RouteData");
        _token = (String) arg.get("token");
        _type = (String) arg.get("Type");


        if (_type.compareTo("Reaction") == 0) {
            _NewAreaAction = (String) arg.get("ObjAreaAction");
            Log.wtf("=========================================> area action (Action.java)", _NewAreaAction);
            //Toast.makeText(_page, _NewAreaAction, Toast.LENGTH_LONG).show();
        }

        RequestHttp request = null;
        try {
            request = new RequestHttp(this);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }


        //request ici
        try {
            request.doGetRequest(routeData.getRouteGet(RouteEnum.GET.SERVICES.ordinal()), "");
        } catch (IOException e) {
            e.printStackTrace();
        }

        /*
        // PUT YOUR FRAGMENTS
        FragmentRecycler serv = FragmentRecycler.newInstance(url, _title);

        // DEFINE FIRST FRAGMENT TO DISPLAY
        getSupportFragmentManager().beginTransaction().add(R.id.fragment, serv).commit();
        */
    }

    @Override
    public void changeFragmentByDirection(SwipeListener.Direction x) {

    }

    @Override
    public void launchActivityFromLogo(int posService, int numberPageRecycler) {
        int recupNbr = posService + (numberPageRecycler * 10) - (1 * numberPageRecycler);

        if (recupNbr <  url.size()) {
            Intent intent = new Intent(this, ListingAction.class);
            intent.putExtra("token", _token);
            intent.putExtra("RouteData", routeData);
            intent.putExtra("DataRegister", _dataUser);
            intent.putExtra("Service", _allServices.get(recupNbr).toString());
            intent.putExtra("Type", _type);

            if (_type.compareTo("Reaction") == 0) {
                intent.putExtra("ObjAreaAction", _NewAreaAction);
            }
            startActivity(intent);
        }
        System.out.println(String.valueOf(recupNbr));
    }

    @Override
    public void treatRequestHttp(int code, String res, String _url) {

        String str = "";
        JSONObject jObject = null;
        try {
            jObject = new JSONObject(res);
            JSONObject services = jObject.getJSONObject("services");
            Iterator<String> keys = services.keys();

            while(keys.hasNext()) {
                String key = keys.next();
                if (services.get(key) instanceof JSONObject) {
                    JSONObject service = (JSONObject) services.get(key);

                    if (_type.compareTo("Reaction") == 0) {

                        JSONArray arrayReac = service.getJSONArray("reactions");
                        if (arrayReac.length() != 0) {
                            _allServices.add(service);
                            str += service.getString("name") + ", ";
                            url.add(service.getString("imageUrl"));
                        }
                    } else {

                        JSONArray arrayReac = service.getJSONArray("actions");
                        if (arrayReac.length() != 0) {
                            _allServices.add(service);
                            str += service.getString("name") + ", ";
                            url.add(service.getString("imageUrl"));
                        }
                    }



                }
            }
            Log.wtf("All_name_services : ", str);

        } catch (JSONException e) {
            e.printStackTrace();
        }

        showAllFragment();
    }

    public void showAllFragment(){
        // PUT YOUR FRAGMENTS
        FragmentRecycler serv = FragmentRecycler.newInstance(url, _type, null);

        // DEFINE FIRST FRAGMENT TO DISPLAY
        getSupportFragmentManager().beginTransaction().add(R.id.fragment, serv).commit();
    }
}
