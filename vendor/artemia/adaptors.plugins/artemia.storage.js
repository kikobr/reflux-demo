/**
 * Created by k33g_org.
 * User: k33g_org
 * Date: 4/27/11
 * Time: 5:31 PM
 * --=>>>|:<
 */

var artemia = (function (cyste) {

    function getLocalStore(kindOfStore, StoreName, storeType) {
        return {
            storeType : storeType,
            storeName : StoreName,
            useReduce : true,

            isAvailable : function () {
                try {
                    kindOfStore.setItem("testKey", "testValue");
                    kindOfStore.removeItem("testKey");
                } catch (err) {
                    return false; /*not available*/
                }
                return true;
            },

            get : function (key, callback) {
                var obj = JSON.parse(kindOfStore.getItem(this.storeName + '|' + key));
                if (obj) {obj.key = key; callback(obj); } else { callback(null); }
            },

            remove : function (keyOrObject, callback) {
                var key = this.storeName + '|' + (typeof keyOrObject === 'string' ? keyOrObject : keyOrObject.key);
                /*TODO: have to verify if exists before delete*/
                kindOfStore.removeItem(key);
                if (callback) { callback(key); }
            },

            save : function (obj, callback) {
                var id = this.storeName + '|' + (obj.key || cyste.guidGenerator());
                delete obj.key;
                //try {
                    kindOfStore.setItem(id, JSON.stringify(obj));

                    obj.key = id.split('|')[1];
                    callback(obj);
                //} catch (err) { throw (err); }
            },

            all : function (callback) {
                var results = [], i, store = kindOfStore, l = store.length, id, key, baseName, obj;
                for (i = 0; i < l; i += 1) {
                    id = store.key(i);
                    baseName = id.split('|')[0];
                    key = id.split('|').slice(1).join("|");
                    if (baseName === this.storeName) {
                        obj = JSON.parse(kindOfStore.getItem(id));
                        obj.key = key;
                        results.push(obj);
                    }
                }
                callback(results);
            },

            drop : function (callback) {
                var that = this;

                this.all(function (r) {
                    var m;
                    for (m in r) {
                        if (r.hasOwnProperty(m)) {
                            that.remove(r[m].key, null);
                        }
                    }
                });
                if (callback) { callback(); }
            }

        };
    }

    /*===========================================
        Navigator : WebKit

        sessionStorage
        localStorage
    ===========================================*/

    /*the _UPPER_ is a convention*/
    cyste.get_SESSION_store = function (baseName, storeType) {
        var store = getLocalStore(window.sessionStorage, baseName, storeType);
        if (!store.isAvailable()) { store = null; }
        return store;
    };

    /*the _UPPER_ is a convention*/
    cyste.get_LOCAL_store = function (baseName, storeType) {
        var store = getLocalStore(window.localStorage, baseName, storeType);
        if (!store.isAvailable()) { store = null; }
        return store;
    };

    /*===========================================
        Navigator : FireFox

        globalStorage
    ===========================================*/

    /*
        Global storage needs http mode to run
        generates error if file mode (file:///)

        Error: uncaught exception:
        [Exception... "Security error"  code: "1000" nsresult: "0x805303e8 (NS_ERROR_DOM_SECURITY_ERR)"
        location: "file:///Users/k33g_org/Dropbox/projects/artemia/js/adaptors.plugins/artemia.GlobalStorage.js Line: 12"]

        see :
        http://ejohn.org/blog/dom-storage-answers/
        http://ejohn.org/blog/dom-storage/

    */

    /*the _UPPER_ is a convention*/
    cyste.get_GLOBAL_store = function (baseName, storeType, domain) {
        //var store = getLocalStore(window.globalStorage[window.location.hostname], baseName, storeType);
        var store = getLocalStore(window.globalStorage[domain], baseName, storeType);
        if (!store.isAvailable()) { store = null; }
        return store;
    };

    return cyste;
}(artemia));
