package area42.area;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.RequiresApi;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.view.Gravity;
import android.view.View;
import android.view.WindowManager;
import android.widget.AbsListView;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;

import area42.area.Fragments.IFragments;
import area42.area.Utils.RegisterData;
import area42.area.Utils.RouteData;

public class ServiceParams extends AppCompatActivity {
    Context page;
    RouteData routeData;
    private RegisterData _dataUser;
    String _token;
    String _type;
    String _name;
    String _returnValue = "";
    String _ObjAreaAction;
    String _ObjAreaReaction;
    JSONArray _parametersArray = new JSONArray();

    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.service_params);
        page = this;

        //Recup Params
        Bundle arg = getIntent().getExtras();
        routeData = (RouteData) arg.get("RouteData");
        _dataUser = (RegisterData) arg.get("DataRegister");
        _token = (String) arg.get("token");
        _type = (String) arg.get("Type");
        _name = (String) arg.get("Name");
        String strParameters = (String) arg.get("Parameters");

        if (_type.compareTo("Reaction") == 0) {
            _ObjAreaReaction = (String) arg.get("ObjAreaReaction");
            _ObjAreaAction = (String) arg.get("ObjAreaAction");
            _returnValue = (String) arg.get("ReturnValue");
        } else {
            _ObjAreaAction = (String) arg.get("ObjAreaAction");
        }

        try {
            _parametersArray = new JSONArray(strParameters);

            //Toast toast = Toast.makeText(this, _parametersArray.getJSONObject(0).getString("name"), Toast.LENGTH_LONG);
            //toast.show();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        final HashMap<Integer, IFragments> allFrag = new HashMap<>();

        FrameLayout framelayoutParent = new FrameLayout(this);
        framelayoutParent.setLayoutParams(new AbsListView.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT));
        framelayoutParent.setBackgroundResource(R.color.colorAreaLight);

        //Create Title of the service action
        TextView txtShowService = new TextView(this);
        //TODO put the title right there
        txtShowService.setText(_name);
        txtShowService.setTextSize(30);
        txtShowService.setGravity(Gravity.CENTER);
        txtShowService.setTextColor(Color.parseColor("White"));
        txtShowService.setBackgroundColor(Color.parseColor("Blue"));
        txtShowService.setLayoutParams(new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT,
                RelativeLayout.LayoutParams.MATCH_PARENT));
        FrameLayout.LayoutParams lp2 = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.WRAP_CONTENT);
        lp2.setMargins(0,0,0,0);
        lp2.height = 200;
        txtShowService.setLayoutParams(lp2);
        framelayoutParent.addView(txtShowService);

        //Create a Scroller
        ScrollView scroller = new ScrollView(this);
        LinearLayout.LayoutParams ll = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT);
        ll.setMargins(0,300,0,300);
        scroller.setLayoutParams(ll);

        //Initializing frame layout
        final FrameLayout framelayout = new FrameLayout(this);
        framelayout.setLayoutParams(new AbsListView.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT));
        framelayout.setFocusable(true);
        this.getWindow().setSoftInputMode(
                WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);

        int top = 0;
        //Tmp string

        for (int i = 0; i < _parametersArray.length(); i++) {
            try {

                FrameLayout fl = new FrameLayout(this);
                int id = i + 1;
                fl.setId(id);
                FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT,450);
                params.setMargins(30, top,30,0);
                fl.setLayoutParams(params);
                IFragments fr;
                JSONObject parameters =_parametersArray.getJSONObject(i);

                //Toast.makeText(this, parameters.getString("name"), Toast.LENGTH_LONG).show();

                fr = IFragments.newInstance(parameters);
                allFrag.put(id, fr);
                getSupportFragmentManager().beginTransaction()
                        .add(id, fr)
                        .commit();
                framelayout.addView(fl);
                top += 450;


            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        scroller.addView(framelayout);

        //Create BTN NEXT to the next activity
        Button btnShowService = new Button(this);
        btnShowService.setText("Next");
        btnShowService.setTextSize(14);
        btnShowService.setGravity(Gravity.CENTER);
        btnShowService.setBackground(ContextCompat.getDrawable(this, R.drawable.rounded_button));
        btnShowService.setTextColor(Color.parseColor("Black"));
        btnShowService.setTypeface(null, Typeface.BOLD);
        btnShowService.setLayoutParams(new FrameLayout.LayoutParams(FrameLayout.LayoutParams.WRAP_CONTENT,
                RelativeLayout.LayoutParams.WRAP_CONTENT));
        FrameLayout.LayoutParams lp1 = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT);
        lp1.rightMargin = 64;
        lp1.bottomMargin = 100;
        lp1.height = 110;
        lp1.width = 250;
        lp1.gravity = Gravity.BOTTOM|Gravity.RIGHT;
        btnShowService.setLayoutParams(lp1);

        framelayoutParent.addView(btnShowService);
        framelayoutParent.addView(scroller);
        setContentView(framelayoutParent);

        btnShowService.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                JSONObject objAllParams = getAllParam();
                if (objAllParams == null)
                    return;


                Intent intent = new Intent();

                try {

                    if (_type.compareTo("Action") == 0) {

                        intent = new Intent(page, Action.class);

                        JSONObject objAreaAction = new JSONObject(_ObjAreaAction);
                        objAreaAction.put("parameters", objAllParams);
                        _ObjAreaAction = objAreaAction.toString();

                        intent.putExtra("Type", "Reaction");
                        intent.putExtra("DataRegister", _dataUser);
                        intent.putExtra("RouteData", routeData);
                        intent.putExtra("token", _token);
                        intent.putExtra("ObjAreaAction", _ObjAreaAction);

                    } else {

                        intent = new Intent(page, SaveArea.class);

                        JSONObject objAreaAction = new JSONObject(_ObjAreaAction);
                        JSONObject objAreaReaction = new JSONObject(_ObjAreaReaction);
                        objAreaReaction.put("parameters", objAllParams);
                        _ObjAreaReaction = objAreaReaction.toString();

                        intent.putExtra("Type", "Reaction");
                        intent.putExtra("DataRegister", _dataUser);
                        intent.putExtra("RouteData", routeData);
                        intent.putExtra("token", _token);
                        intent.putExtra("objAreaAction", objAreaAction.toString());
                        intent.putExtra("objAreaReaction", objAreaReaction.toString());

                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                startActivity(intent);
            }

            public JSONObject getAllParam() {

                JSONObject objAllParams = new JSONObject();

                for (int i = 0; i < _parametersArray.length(); i++) {

                    int id = i + 1;

                    IFragments frag = allFrag.get(id);
                    JSONObject objParam = frag.getParameters();
                    if (objParam == null)
                        return null;
                    Iterator<String> keys = objParam.keys();

                    while(keys.hasNext()) {
                        String key = keys.next();
                        try {
                            if (objParam.get(key) instanceof String) {
                                String parameters = objParam.getString(key);
                                objAllParams.put(key, parameters);
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }
                return objAllParams;
            }

        });
    }
}
