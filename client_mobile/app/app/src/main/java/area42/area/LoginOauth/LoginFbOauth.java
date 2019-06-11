package area42.area.LoginOauth;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.GraphRequest;
import com.facebook.GraphResponse;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Arrays;

import area42.area.Utils.RegisterData;
import area42.area.Utils.RouteData;

public class LoginFbOauth {
    private CallbackManager callbackManager = CallbackManager.Factory.create();
    private ProgressDialog mDialog;
    protected RegisterData dataUser = new RegisterData(null, null, null, null, null, null);
    private Context currentContext;

    public void setRouteData(RouteData routeData) {
        this.routeData = routeData;
    }

    private RouteData routeData;

    public LoginFbOauth(Context Context) {
        currentContext = Context;
        FacebookSdk.sdkInitialize(currentContext);
        AppEventsLogger.activateApp(currentContext);
    }

    public void getButton(LoginButton fbBtnLogin) {

        fbBtnLogin.setReadPermissions(Arrays.asList("email"));
        fbBtnLogin.registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(final LoginResult loginResult) {
                mDialog = new ProgressDialog(currentContext);
                mDialog.setMessage("Retrieve Data ...");
                mDialog.show();

                GraphRequest request = GraphRequest.newMeRequest(loginResult.getAccessToken(), new GraphRequest.GraphJSONObjectCallback() {
                    @Override
                    public void onCompleted(JSONObject object, GraphResponse response) {
                        mDialog.dismiss();
                        dataUser.setAccessToken(loginResult.getAccessToken().getToken());
                        Log.d("response", response.toString());
                        Log.wtf("responseFACEBOOK", response.toString());
                        try {
                            dataUser.setAuthType("facebook");
                            dataUser.setUsername(object.getString("first_name") + " " + object.getString("last_name"));
                            dataUser.setUserId(object.getString("id"));

                            Intent intent = new Intent( currentContext, RequestRegisterLogin.class);

                            intent.putExtra("DataRegister", dataUser);
                            intent.getSerializableExtra("DataRegister");
                            intent.putExtra("TypeRequest", "Register");
                            intent.putExtra("RouteData", routeData);
                            currentContext.startActivity(intent);

                        } catch (JSONException e) {
                            dataUser.setAccessToken(null);
                            e.printStackTrace();
                        }
                    }
                });
                //request Graph API
                Bundle parameters = new Bundle();
                parameters.putString("fields", "id,email,first_name,last_name");
                request.setParameters(parameters);
                request.executeAsync();
            }

            @Override
            public void onCancel() {
            }

            @Override
            public void onError(FacebookException exception) {
                Log.wtf("HEY", exception.toString());
            }
        });

        /*
        if (AccessToken.getCurrentAccessToken() != null) {
            mDialog = new ProgressDialog(currentContext);
            mDialog.setMessage("Retrieve Data ...");
            mDialog.show();
            new GraphRequest(AccessToken.getCurrentAccessToken(), "/me/permissions/", null, HttpMethod.DELETE, new GraphRequest
                    .Callback() {
                @Override
                public void onCompleted(GraphResponse graphResponse) {

                    LoginManager.getInstance().logOut();

                }
            }).executeAsync();

            dataUser.setUserId(null);
            dataUser.setAccessToken(null);
            dataUser.setAuthType(null);
            dataUser.setUsername(null);
            mDialog.dismiss();
        }
        */

    }

    public RegisterData getDataUser(){
        return dataUser;
    }

    public void UseCallBackManager(int requestCode, int resultCode, @Nullable Intent data) {
        callbackManager.onActivityResult(requestCode, resultCode, data);
    }
}
