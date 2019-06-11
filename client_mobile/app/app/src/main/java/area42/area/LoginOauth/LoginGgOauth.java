package area42.area.LoginOauth;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.support.annotation.Nullable;
import android.util.Log;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;

import area42.area.Utils.RegisterData;

public class LoginGgOauth {

    RegisterData dataUser;
    private GoogleSignInClient mGoogleSignInClient;
    private static final int REQ_CODE = 0;
    private Context currContext;
    public Intent SignInIntent;

    public LoginGgOauth(Context currentContext) {
        currContext = currentContext;
        dataUser = new RegisterData(null, null, null, null, null, null);
    }

    public void getButton(SignInButton viewById) {

        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken("540282318330-j591lt28212ngke31ggrei70j2raq89p.apps.googleusercontent.com")
                .requestEmail()
                .build();
        mGoogleSignInClient = GoogleSignIn.getClient(currContext, gso);
        SignInIntent = mGoogleSignInClient.getSignInIntent();
    }

    public RegisterData getDataUser(){
        return dataUser;
    }

    private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
        try {
            GoogleSignInAccount acct = completedTask.getResult(ApiException.class);
//            GoogleSignInAccount acct = GoogleSignIn.getLastSignedInAccount(currContext);

            if (acct != null) {

                Uri personPhoto = acct.getPhotoUrl();
                String personGivenName = acct.getGivenName();
                String personFamilyName = acct.getFamilyName();
                String personEmail = acct.getEmail();


                String personName = acct.getDisplayName();
                String personId = acct.getId();
                String personToken = acct.getIdToken();
                //acct.getServerAuthCode();

                dataUser.setUsername(personName);
                dataUser.setAccessToken(personToken);
                dataUser.setUserId(personId);
                dataUser.setAuthType("google");
            }

        } catch (ApiException e) {
            Log.w("RES : ", "signInResult:failed code=" + e.getStatusCode());
        }
    }

    public void UseCallBackManager(int requestCode, int resultCode, @Nullable Intent data) {

        if (requestCode == REQ_CODE) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleSignInResult(task);
        }
    }
}
