package area42.area;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;

import area42.area.Interface.IDisplay;
import area42.area.MainPage.HomePage;
import area42.area.Utils.RegisterData;
import area42.area.Utils.RequestHttp;
import area42.area.Utils.RouteData;
import area42.area.Utils.RouteEnum;

public class SaveArea extends AppCompatActivity implements IDisplay {

    private SaveArea _page;
    private String _type;
    private RouteData _routeData;
    private RegisterData _dataUser;
    private String _token;
    private String _objAreaAction;
    private String _objAreaReaction;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_save_area);
        _page = this;

        //Recup Params
        Bundle arg = getIntent().getExtras();
        _routeData = (RouteData) arg.get("RouteData");
        _dataUser = (RegisterData) arg.get("DataRegister");
        _token = (String) arg.get("token");
        _type = (String) arg.get("Type");
        _objAreaAction = (String) arg.get("objAreaAction");
        _objAreaReaction = (String) arg.get("objAreaReaction");
        
        
        ((Button)findViewById(R.id.saveButton)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText name = (EditText)findViewById(R.id.name);
                EditText desc = (EditText)findViewById(R.id.desc);
                String nameString = name.getText().toString().trim();
                String descString = desc.getText().toString().trim();
                if (nameString.equals(""))
                {
                    name.setError("Name is required!");
                }
                if (descString.equals(""))
                {
                    desc.setError("Description is required!");
                }
                if (!nameString.equals("") && !descString.equals("")) {

                    Intent intent = new Intent(_page, HomePage.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    intent.putExtra("DataRegister", _dataUser);
                    intent.putExtra("RouteData", _routeData);
                    intent.putExtra("token", _token);

                    JSONObject objArea = new JSONObject();
                    try {

                        JSONObject objAreaAction = new JSONObject(_objAreaAction);
                        JSONArray objAreaArrayReaction = new JSONArray();
                        JSONObject objAreaReaction = new JSONObject(_objAreaReaction);

                        objAreaArrayReaction.put(objAreaReaction);

                        objArea.put("name", nameString);
                        objArea.put("description", descString);
                        objArea.put("activated", true);
                        objArea.put("action", objAreaAction);
                        objArea.put("reactions", objAreaArrayReaction);

                        JSONObject myArea = new JSONObject();
                        myArea.put("area", objArea);

                        //Toast.makeText(_page, myArea.toString(), Toast.LENGTH_LONG).show();
                        Log.wtf("==========================================================>>>AREAAA", myArea.toString());

                        HashMap<String, String> body = new HashMap<>();
                        body.put("area", myArea.toString());
                        RequestHttp request = null;
                        try {
                            request = new RequestHttp(_page);
                            request.setToken(_token);
                            request.doPostRequest(_routeData.getRoutePost(RouteEnum.POST.ADD_AREA.ordinal()), myArea.toString());
                        } catch (NoSuchAlgorithmException e) {
                            e.printStackTrace();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }

                        //request ici
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    startActivity(intent);


                }
            }
        });
    }

    @Override
    public void treatRequestHttp(int code, String res, String url) {
        System.out.println("RESS " + String.valueOf(code) + "  " + res);
        try {
            JSONObject result = new JSONObject(res);
            result.getString("id");
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
