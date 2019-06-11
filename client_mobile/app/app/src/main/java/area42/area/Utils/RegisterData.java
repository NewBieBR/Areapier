package area42.area.Utils;

import java.io.Serializable;

public class RegisterData implements Serializable {

    String username;
    String password;
    String passwordVerif;
    String userId;
    String authType;
    String accessToken;

    //Constructor
    public RegisterData(String username, String password, String passwordVerif, String userId, String authType, String accessToken) {
        this.username = username;
        this.password = password;
        this.passwordVerif = passwordVerif;
        this.userId = userId;
        this.authType = authType;
        this.accessToken = accessToken;
    }


    //Setter
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPasswordVerif(String passwordVerif) {
        this.passwordVerif = passwordVerif;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setAuthType(String authType) {
        this.authType = authType;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }



    //Getter
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getPasswordVerif() {
        return passwordVerif;
    }

    public String getUserId() {
        return userId;
    }

    public String getAuthType() {
        return authType;
    }

    public String getAccessToken() {
        return accessToken;
    }

}
