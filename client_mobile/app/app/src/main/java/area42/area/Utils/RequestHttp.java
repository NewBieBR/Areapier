package area42.area.Utils;

import android.app.Activity;
import android.util.Log;

import com.squareup.okhttp.Callback;
import com.squareup.okhttp.FormEncodingBuilder;
import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;

import java.io.IOException;
import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import area42.area.Interface.IDisplay;

public class RequestHttp<T> extends Activity implements Serializable {

    public OkHttpClient getUnsafeOkHttpClient() {
        try {
// Create a trust manager that does not validate certificate chains
            final TrustManager[] trustAllCerts = new TrustManager[]{
                    new X509TrustManager() {
                        @Override
                        public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
                        }

                        @Override
                        public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
                        }

                        @Override
                        public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                            return null;
                        }
                    }
            };

            final SSLContext sslContext = SSLContext.getInstance("SSL");

            sslContext.init(null, trustAllCerts, new java.security.SecureRandom());
// Create an ssl socket factory with our all-trusting manager
            final SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();

            OkHttpClient okHttpClient = new OkHttpClient();
            okHttpClient.setSslSocketFactory(sslSocketFactory);
            okHttpClient.setHostnameVerifier(new HostnameVerifier() {
                @Override
                public boolean verify(String hostname, SSLSession session) {
                    return true;
                }
            });

            return okHttpClient;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Constructor
    public RequestHttp(T inst) throws NoSuchAlgorithmException {
        this.instance = inst;
        client = getUnsafeOkHttpClient();
        if (client != null) {
            client.setConnectTimeout(5, TimeUnit.SECONDS);
            client.setReadTimeout(5, TimeUnit.SECONDS);
        }
        }

    OkHttpClient client;

    public String doGetRequest(String url, String parameters) throws IOException {
        if (client == null)
            return "error";
        if (!parameters.equals(""))
            url += parameters;
        Request request;
        request = new Request.Builder()
                .url(url)
                .addHeader("Authorization",  _token)
                .build();
        final String finalUrl = url;
        client.newCall(request).enqueue(new Callback() {

            @Override
            public void onFailure(Request request, IOException e) {
                RequestHttp.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        ((IDisplay) instance).treatRequestHttp(404, "Server not reachable", finalUrl);
                    }
                });
            }

            @Override
            public void onResponse(Response response) throws IOException {
                final String rep = response.body().string();
                final int code = response.code();
                RequestHttp.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        ((IDisplay) instance).treatRequestHttp(code, rep, finalUrl);
                    }
                });
            }
        });
        return "ok";
    }

    public static final MediaType JSON
            = MediaType.parse("application/json; charset=utf-8");

    public String doPostRequest(final String url, String json) throws IOException {
        if (client == null)
            return "error";

        RequestBody body = RequestBody.create(JSON, json);

        Request request;
        request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("accept", "application/json")
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization",  _token)
                .build();
        System.out.println("AREAAA " + json);
        client.newCall(request).enqueue(new Callback() {

            @Override
            public void onFailure(Request request, IOException e) {
                Log.wtf("Response_server Echec : ", request.toString());
                RequestHttp.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        ((IDisplay) instance).treatRequestHttp(404, "Server not reachable", url);
                    }
                });
            }

            @Override
            public void onResponse(Response response) throws IOException {
                final String rep = response.body().string();
                final int code = response.code();
                RequestHttp.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        ((IDisplay) instance).treatRequestHttp(code, rep, url);
                    }
                });
            }

        });
        return "ok";
    }

    //Post Method
    public String doPostRequest(final String url, Map<String, String> parameters) throws IOException {
        if (client == null)
            return "error";

        FormEncodingBuilder formBody = new FormEncodingBuilder();
        for (String key : parameters.keySet()) {
            formBody.add(key, parameters.get(key));
        }
        RequestBody body = formBody.build();

        Request request;
        request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("accept", "application/json")
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization",  _token)
                .build();
        System.out.println("AREAAA " + parameters.get(0));
        client.newCall(request).enqueue(new Callback() {

            @Override
            public void onFailure(Request request, IOException e) {
                Log.wtf("Response_server Echec : ", request.toString());
                RequestHttp.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        ((IDisplay) instance).treatRequestHttp(404, "Server not reachable", url);
                    }
                });
            }

            @Override
            public void onResponse(Response response) throws IOException {
                final String rep = response.body().string();
                final int code = response.code();
                RequestHttp.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        ((IDisplay) instance).treatRequestHttp(code, rep, url);
                    }
                });
            }

        });
        return "ok";
    }

    //delete
    public String doDeleteRequest(final String url, Map<String, String> parameters) throws IOException {
        if (client == null)
            return "error";

        FormEncodingBuilder formBody = new FormEncodingBuilder();
        for (String key : parameters.keySet()) {
            formBody.add(key, parameters.get(key));
        }
        RequestBody body = formBody.build();

        Request request;
        request = new Request.Builder()
                .url(url)
                .delete(body)
                .addHeader("accept", "application/json")
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization",  _token)
                .build();
        System.out.println("AREAAA " + parameters.get(0));
        client.newCall(request).enqueue(new Callback() {

            @Override
            public void onFailure(Request request, IOException e) {
                Log.wtf("Response_server Echec : ", request.toString());
                RequestHttp.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        ((IDisplay) instance).treatRequestHttp(404, "Server not reachable", url);
                    }
                });
            }

            @Override
            public void onResponse(Response response) throws IOException {
                final String rep = response.body().string();
                final int code = response.code();
                RequestHttp.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        ((IDisplay) instance).treatRequestHttp(code, rep, url);
                    }
                });
            }

        });
        return "ok";
    }


    //put
    public String doPutRequest(final String url, String json) throws IOException {
        if (client == null)
            return "error";

        RequestBody body = RequestBody.create(JSON, json);

        Request request;
        request = new Request.Builder()
                .url(url)
                .put(body)
                .addHeader("accept", "application/json")
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization",  _token)
                .build();
        client.newCall(request).enqueue(new Callback() {

            @Override
            public void onFailure(Request request, IOException e) {
                Log.wtf("Response_server Echec : ", request.toString());
                RequestHttp.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        ((IDisplay) instance).treatRequestHttp(404, "Server not reachable", url);
                    }
                });
            }

            @Override
            public void onResponse(Response response) throws IOException {
                final String rep = response.body().string();
                final int code = response.code();
                RequestHttp.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        ((IDisplay) instance).treatRequestHttp(code, rep, url);
                    }
                });
            }

        });
        return "ok";
    }

    //Setter
    public void setToken(String t) { _token = t; }

    private String _token = "";
    private T instance;
}