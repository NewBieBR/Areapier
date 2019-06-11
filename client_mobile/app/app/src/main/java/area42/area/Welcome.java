package area42.area;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;

import com.facebook.login.widget.LoginButton;
import com.google.android.gms.common.SignInButton;
import com.twitter.sdk.android.core.identity.TwitterLoginButton;

import area42.area.Area42Auth.LoginArea42;
import area42.area.Area42Auth.RegisterFormArea42;
import area42.area.LoginOauth.LoginFbOauth;
import area42.area.LoginOauth.LoginGgOauth;
import area42.area.LoginOauth.LoginTwitterOauth;
import area42.area.LoginOauth.RequestRegisterLogin;
import area42.area.MainPage.HomePage;
import area42.area.Utils.RegisterData;
import area42.area.Utils.RouteData;

public class Welcome extends AppCompatActivity {

    Button btnSignUp;
    Button btnSignIn;
    EditText txtIpAdress;
    Welcome page;
    private RegisterData dataUser = new RegisterData(null, null, null, null, null, null);
    private RouteData routeData = new RouteData();
    int currentLogin = 0;

    TwitterLoginButton btnTwitter;
    LoginTwitterOauth logTwitter;

    LoginButton btnFacebook;
    LoginFbOauth logFb;

    SignInButton btnGoogle;
    LoginGgOauth logGg;

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (currentLogin == 1) {
            if (!txtIpAdress.getText().toString().isEmpty()) {
                routeData.setIp(txtIpAdress.getText().toString());
            } else {
                routeData.setIp("");
            }
            logFb.setRouteData(routeData);
            logFb.UseCallBackManager(requestCode, resultCode, data);
        }
        else if (currentLogin == 2) {
            logGg.UseCallBackManager(requestCode, resultCode, data);
        }
        else if (currentLogin == 3) {
            logTwitter.UseCallBackManager(requestCode, resultCode, data);
        }
        if (currentLogin == 1 || currentLogin == 2 || currentLogin == 3) {
            //Toast.makeText(this, "Username => " + dataUser.getUsername() + ", authType => " + dataUser.getAuthType() +  ", id => " + dataUser.getUserId() + ", Token => " + dataUser.getAccessToken(), Toast.LENGTH_SHORT).show();

            if (currentLogin == 2 || currentLogin == 3) {

                if (!txtIpAdress.getText().toString().isEmpty()) {
                    routeData.setIp(txtIpAdress.getText().toString());
                } else {
                    routeData.setIp("");
                }

                Intent intent = new Intent(Welcome.this, RequestRegisterLogin.class);
                intent.putExtra("DataRegister", dataUser);
                getIntent().getSerializableExtra("DataRegister");
                intent.putExtra("TypeRequest", "Register");
                intent.putExtra("RouteData", routeData);
                startActivity(intent);
            }
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        page = this;
        routeData.setArray(getResources().getStringArray(R.array.routes_post), getResources().getStringArray(R.array.routes_get), getResources().getStringArray(R.array.routes_put), getResources().getStringArray(R.array.routes_delete));

        if (isOnline()) {
            SharedPreferences sharedPref = getSharedPreferences("_save", MODE_PRIVATE);
            String token = sharedPref.getString("token", "");
            if (token != null && token != "") {
                Intent intent = new Intent(this, HomePage.class);
                startActivity(intent);
            }
        }
        else {
            AlertDialog.Builder dlgAlert  = new AlertDialog.Builder(this);
            dlgAlert.setMessage("No network connection");
            dlgAlert.setTitle("AREA 42");
            dlgAlert.setCancelable(false);
            dlgAlert.setPositiveButton("Ok",
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                        }
                    });
            dlgAlert.create().show();
        }


        String err = (String) getIntent().getExtras().get("Error");
        if (err != null && err != "") {
            AlertDialog.Builder dlgAlert  = new AlertDialog.Builder(this);
            dlgAlert.setMessage(err);
            dlgAlert.setTitle("AREA 42");
            dlgAlert.setCancelable(false);
            dlgAlert.setPositiveButton("Ok",
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                        }
                    });
            dlgAlert.create().show();

        }


        logFb = new LoginFbOauth(this);
        logGg = new LoginGgOauth(this);
        logTwitter = new LoginTwitterOauth(this);

        setContentView(R.layout.activity_welcome);

        btnFacebook = findViewById(R.id.fbBtnLogin);
        btnFacebook.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                logFb.getButton((LoginButton) findViewById(R.id.fbBtnLogin));
                dataUser = logFb.getDataUser();
                currentLogin = 1;
            }
        });

        btnGoogle = findViewById(R.id.googleBtnLogin);
        btnGoogle.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                logGg.getButton((SignInButton) findViewById(R.id.googleBtnLogin));
                startActivityForResult(logGg.SignInIntent, 0);
                dataUser = logGg.getDataUser();
                currentLogin = 2;
            }
        });

        btnTwitter = findViewById(R.id.btnTwitter);
        logTwitter.getButton((TwitterLoginButton) findViewById(R.id.btnTwitter));
        btnTwitter.setText("Twitter");
        btnTwitter.setTextSize(22);
        btnTwitter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                dataUser = logTwitter.getDataUser();
                currentLogin = 3;
            }
        });

        btnSignIn = findViewById(R.id.btnSignIn);
        btnSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SignIn();
            }
        });

        btnSignUp = findViewById(R.id.btnSignUp);
        btnSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SignUp();
            }
        });


        txtIpAdress = findViewById(R.id.editIpAdress);

        this.getWindow().setSoftInputMode(
                WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);

    }

    private void SignUp() {
        if (!txtIpAdress.getText().toString().isEmpty()) {
            routeData.setIp(txtIpAdress.getText().toString());
        } else {
            routeData.setIp("");
        }
        Intent intentRegisterArea = new Intent(this, RegisterFormArea42.class);
        intentRegisterArea.putExtra("RouteData", routeData);
        startActivity(intentRegisterArea);
    }
    private void SignIn() {
        if (!txtIpAdress.getText().toString().isEmpty()) {
            routeData.setIp(txtIpAdress.getText().toString());
        } else {
            routeData.setIp("");
        }
        Intent intentLoginArea = new Intent(this , LoginArea42.class);
        intentLoginArea.putExtra("RouteData", routeData);
        startActivity(intentLoginArea);
    }

    public boolean isOnline() {
        ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo netInfo = cm.getActiveNetworkInfo();
        return netInfo != null && netInfo.isConnectedOrConnecting();
    }
}
