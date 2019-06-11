package area42.area.LoginOauth;

import android.content.Context;
import android.content.Intent;
import android.support.annotation.Nullable;
import android.util.Log;

import com.twitter.sdk.android.core.Callback;
import com.twitter.sdk.android.core.DefaultLogger;
import com.twitter.sdk.android.core.Result;
import com.twitter.sdk.android.core.Twitter;
import com.twitter.sdk.android.core.TwitterAuthConfig;
import com.twitter.sdk.android.core.TwitterAuthToken;
import com.twitter.sdk.android.core.TwitterConfig;
import com.twitter.sdk.android.core.TwitterCore;
import com.twitter.sdk.android.core.TwitterException;
import com.twitter.sdk.android.core.TwitterSession;
import com.twitter.sdk.android.core.identity.TwitterLoginButton;

import area42.area.Utils.RegisterData;

public class LoginTwitterOauth {
    RegisterData dataUser;
    TwitterLoginButton btnTwitter;
    Context currentContext;


    public LoginTwitterOauth(Context context) {
        dataUser = new RegisterData(null, null, null, null, null, null);
        Twitter.initialize(context);
        currentContext = context;
    }

    public void getButton(TwitterLoginButton loginButton) {

        btnTwitter = loginButton;

        TwitterConfig config = new TwitterConfig.Builder(currentContext)
                .logger(new DefaultLogger(Log.DEBUG))
                .twitterAuthConfig(new TwitterAuthConfig("CONSUMER_KEY", "CONSUMER_SECRET"))
                .debug(true)
                .build();
        Twitter.initialize(config);

        btnTwitter.setCallback(new Callback<TwitterSession>() {
            @Override
            public void success(Result<TwitterSession> result) {
                TwitterSession session = TwitterCore.getInstance().getSessionManager().getActiveSession();

                TwitterAuthToken authToken = session.getAuthToken();
                String username = session.getUserName();
                String token = authToken.token;
                String secret = authToken.secret;

                dataUser.setAuthType("twitter");
                dataUser.setUsername(username);
                dataUser.setAccessToken(token);
                dataUser.setUserId(secret);

                // Do something with result, which provides a TwitterSession for making API calls
            }

            @Override
            public void failure(TwitterException exception) {
                // Do something on failure
                Log.wtf("twitter BAD", "NULLLLLL");
                Log.wtf("TwitterERROR =>", exception.toString());

            }
        });
    }

    public RegisterData getDataUser(){
        return dataUser;
    }

    public void UseCallBackManager(int requestCode, int resultCode, @Nullable Intent data) {
        btnTwitter.onActivityResult(requestCode, resultCode, data);
    }
}
