package area42.area.LoginOauth;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import area42.area.Interface.IDisplay;
import area42.area.MainPage.HomePage;
import area42.area.R;
import area42.area.Utils.RegisterData;
import area42.area.Utils.RequestHttp;
import area42.area.Utils.RouteData;
import area42.area.Utils.RouteEnum;
import area42.area.Welcome;

import static android.os.SystemClock.sleep;

public class RequestRegisterLogin extends AppCompatActivity implements IDisplay {
    RequestRegisterLogin requestRegisterLogin;
    private RegisterData dataUser;
    private RouteData routeData;
    private boolean _typeLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_request_register_login);

        requestRegisterLogin = this;

        //Recupere les arguments
        Bundle arg = getIntent().getExtras();
        dataUser = (RegisterData) arg.get("DataRegister");
        routeData = (RouteData) arg.get("RouteData");
        String TypeRequest = (String) arg.get("TypeRequest");

        //Les affiches
        Map<String, String> params = recupAllParams(dataUser);
        //tmp display parm to send
        for (String key : params.keySet()) {
            Log.wtf("Params =====>", "Key : " + key + " | value : " + params.get(key));
        }

        Log.wtf("TypeRequest ====>", TypeRequest);
        if (TypeRequest.compareTo("Register") == 0) {
            _typeLogin = false;
            RequestHttp requestToRegister = null;
            try {
                requestToRegister = new RequestHttp(this);
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }
            try {
                if (dataUser.getAuthType().compareTo("area") == 0) {
                    Log.wtf("TypeRequest 1 ====>", routeData.getRoutePost(RouteEnum.POST.CREATE_USER.ordinal()) + " params : " + params);
                    if (requestToRegister.doPostRequest(routeData.getRoutePost(RouteEnum.POST.CREATE_USER.ordinal()), params) == "error") {
                        Intent intent = new Intent(RequestRegisterLogin.this, Welcome.class);
                        intent.putExtra("Error", "Please check your internet connection");
                        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                        startActivity(intent);
                        finish();
                        return;
                    }
                } else {
                    Log.wtf("TypeRequest 2 ====>", routeData.getRoutePost(RouteEnum.POST.CREATE_USER.ordinal()) + " params : " + params);
                    if (requestToRegister.doPostRequest(routeData.getRoutePost(RouteEnum.POST.CREATE_USER.ordinal()), params) == "error") {
                        Intent intent = new Intent(RequestRegisterLogin.this, Welcome.class);
                        intent.putExtra("Error", "Please check your internet connection");
                        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                        startActivity(intent);
                        finish();
                        return;
                    }
                }
                sleep(1000);
            } catch (IOException e) {
                Intent intent = new Intent(RequestRegisterLogin.this, Welcome.class);
                intent.putExtra("Error", "Please check your internet connection");
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(intent);
                finish();
                return;
            }
        }

        _typeLogin = true;
        RequestHttp requestToLogIn = null;
        try {
            requestToLogIn = new RequestHttp(this);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        try {
            System.out.println(params.get("authType"));
            if (requestToLogIn.doPostRequest(routeData.getRoutePost(RouteEnum.POST.CONNECTION_USER.ordinal()), params) == "error") {
                Intent intent = new Intent(RequestRegisterLogin.this, Welcome.class);
                intent.putExtra("Error", "Please check your internet connection");
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(intent);
                finish();
                return;
            }
        } catch (IOException e) {
            Intent intent = new Intent(RequestRegisterLogin.this, Welcome.class);
            intent.putExtra("Error", "Please check your internet connection");
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent);
            finish();
            return;
        }
    }

    private Map<String, String> recupAllParams(RegisterData dataUser) {
        this.dataUser = dataUser;
        Map<String, String> params = new HashMap<>();
        Log.wtf("Autg type =======>", dataUser.getAuthType());
        if (dataUser.getAuthType() != null) {
            params.put("authType", dataUser.getAuthType());

            if (dataUser.getAuthType().compareTo("area") == 0) {
                params.put("password", dataUser.getPassword());
                params.put("username", dataUser.getUsername());
            } else {
                params.put("token", dataUser.getAccessToken());
                params.put("oauthId", dataUser.getUserId());
            }
        }
        return params;
    }

    @Override
    public void treatRequestHttp(int code, String res, String url) {
        Log.wtf("RETOUR====>", res);
        if (code != 200) {
            Intent intent = new Intent(RequestRegisterLogin.this, Welcome.class);
            intent.putExtra("Error", res);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent);
            finish();
            return;
        }
        try {
            if (_typeLogin == false)
                return;
            JSONObject jObject = new JSONObject(res);
            String token = jObject.getString("token");
            String expire = jObject.getString("expirationDate");
            System.out.println("BBBB " + token);
            System.out.println("BBBB " + expire);
            Intent intent = new Intent(RequestRegisterLogin.this, HomePage.class);
            intent.putExtra("RouteData", routeData);
            intent.putExtra("token", token);
            intent.putExtra("expireDate", expire);
            intent.putExtra("DataRegister", dataUser);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);

            // Custom TOAST
            Toast toast = Toast.makeText(this, "Welcome " + dataUser.getUsername(), Toast.LENGTH_LONG);
            View toastView = toast.getView();
            toastView.getBackground().setColorFilter(Color.rgb(85, 121, 177), PorterDuff.Mode.SRC_IN);
            TextView toastMessage = (TextView) toastView.findViewById(android.R.id.message);
            toastMessage.setTextSize(25);
            toastMessage.setGravity(Gravity.CENTER);
            toast.show();

            startActivity(intent);
            finish();
            return;

        } catch (JSONException e) {
            Intent intent = new Intent(RequestRegisterLogin.this, Welcome.class);
            intent.putExtra("Error", "Server error");
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent);
            finish();
            return;
        }
    }

}
