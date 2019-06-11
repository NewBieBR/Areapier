package area42.area.Utils;

import java.io.Serializable;

public class RouteData implements Serializable {

    public RouteData() {
    }

    public void setIp(String address) {
        if (!address.isEmpty()) {
            this._address = address;
        } else {
            this._address = _ipRef;
        }
    }

    public void setArray(String[] routesPost, String[] routesGet, String[] routesPut, String[] routesDelete) {

        _routesPost = routesPost;
        _routesGet = routesGet;
        _routesPut = routesPut;
        _routesDelete = routesDelete;
    }

    public String getRoutePost(int val){
        return _address + _routesPost[val];
    }

    public String getRouteGet(int val){
        return _address + _routesGet[val];
    }

    public String getRoutePut(int val){
        return _address + _routesPut[val];
    }

    public String getRouteDelete(int val){
        return _address + _routesDelete[val];
    }

    String _ipRef = "https://10.0.2.2:8080";
    String _address;
    String[] _routesPost;
    String[] _routesGet;
    String[] _routesPut;
    String[] _routesDelete;
}