package area42.area.MainPage;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.Switch;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import area42.area.Interface.IDisplay;
import area42.area.R;
import area42.area.Utils.RegisterData;
import area42.area.Utils.RequestHttp;
import area42.area.Utils.RouteData;
import area42.area.Utils.RouteEnum;

public class AreaInformation extends AppCompatActivity implements IDisplay {

    private AreaInformation _page;
    private String _id;
    private Switch _switch;
    private RequestHttp _request;
    private RouteData _routeData;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_area_information);
        _page = this;

        _switch = (Switch) findViewById(R.id.switchActivated);

        try {
            JSONObject obj = new JSONObject(getIntent().getExtras().getString("area"));
            _routeData = (RouteData) getIntent().getExtras().get("RouteData");
            ((TextView)findViewById(R.id.title)).setText(obj.getString("name"));
            ((TextView)findViewById(R.id.desc)).setText(obj.getString("description"));
            _id = obj.getString("id");
            _request = new RequestHttp(_page);
            _request.setToken(getIntent().getExtras().getString("token"));

            boolean tmp = obj.getBoolean("activated");
            Log.wtf("obj_area_activated=============>", String.valueOf(tmp));
            if (tmp)
                _switch.setChecked(true);
            else
                _switch.setChecked(false);
        } catch (JSONException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        _switch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {

                /*
                Map<String, String> parameters = new HashMap<>();
                parameters.put("id", _id);
                parameters.put("activated", String.valueOf(isChecked));
                */

                JSONObject objAreaInfo = new JSONObject();
                try {
                    objAreaInfo.put("id", _id);
                    objAreaInfo.put("activated", isChecked);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                try {
                    _request.doPutRequest(_routeData.getRoutePut(RouteEnum.PUT.MODIF_AREA.ordinal()), objAreaInfo.toString());
                } catch (IOException e) {
                    e.printStackTrace();
                }


            }
        });


        ((Button)findViewById(R.id.deleteButton)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Map<String, String> parameters = new HashMap<>();
                parameters.put("id", _id);
                try {
                    _request.doDeleteRequest(_routeData.getRouteDelete(RouteEnum.DELETE.DEL_AREA.ordinal()), parameters);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                LeaveActivity();


            }

        });
    }

    @Override
    public void onBackPressed() {
        overridePendingTransition( 0, 0);
        Intent intent = new Intent(_page, HomePage.class);
        //intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        intent.putExtra("DataRegister", (RegisterData)getIntent().getExtras().get("DataRegister"));
        intent.putExtra("RouteData", (RouteData)getIntent().getExtras().get("RouteData"));
        intent.putExtra("token", getIntent().getExtras().getString("token"));
        startActivity(intent);
        overridePendingTransition( 0, R.anim.slide_up_to_down);
        finish();
    }

    @Override
    public void treatRequestHttp(int code, String res, String url) {
        if (code == 200 && (url == (_routeData.getRouteDelete(RouteEnum.DELETE.DEL_AREA.ordinal())))) {
            LeaveActivity();
        }
        Log.wtf("Result_Put_request==========> ", "code : " + String.valueOf(code) + ", res : " + res);
    }


    public void LeaveActivity() {
        overridePendingTransition( 0, 0);
        Intent intent = new Intent(_page, HomePage.class);
        //intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        intent.putExtra("DataRegister", (RegisterData)getIntent().getExtras().get("DataRegister"));
        intent.putExtra("RouteData", (RouteData)getIntent().getExtras().get("RouteData"));
        intent.putExtra("token", getIntent().getExtras().getString("token"));
        startActivity(intent);
        overridePendingTransition( 0, R.anim.slide_up_to_down);
        finish();
    }
}
