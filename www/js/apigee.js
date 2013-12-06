"console"in window||(window.console={log:function(){}});var Usergrid=function(){function t(){for(var t=[],e="0123456789ABCDEF",i=0;36>i;i++)t[i]=Math.floor(16*Math.random());t[14]=4,t[19]=8|3&t[19];for(var i=0;36>i;i++)t[i]=e[t[i]];return t[8]=t[13]=t[18]=t[23]="-",t.join("")}function e(t){var e=/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;return t?e.test(t):!1}function i(t){tail=[];var e=[];if(t instanceof Array)for(var i in t)e=t[i],e instanceof Array&&e.length>1&&tail.push(e[0]+"="+encodeURIComponent(e[1]));else for(var n in t)if(t.hasOwnProperty(n)){var o=t[n];if(o instanceof Array)for(var i in o)e=o[i],tail.push(n+"="+encodeURIComponent(e));else tail.push(n+"="+encodeURIComponent(o))}return tail.join("&")}return window.Usergrid=window.Usergrid||{},Usergrid=Usergrid||{},Usergrid.USERGRID_SDK_VERSION="2.0.5",Usergrid.Client=function(t){if(this.URI=t.URI||"https://api.usergrid.com",t.orgName&&this.set("orgName",t.orgName),t.appName&&this.set("appName",t.appName),t.appVersion&&this.set("appVersion",t.appVersion),this.buildCurl=t.buildCurl||!1,this.logging=t.logging||!1,this.monitoringEnabled=t.monitoringEnabled||!0,this._callTimeout=t.callTimeout||3e4,this._callTimeoutCallback=t.callTimeoutCallback||null,this.logoutCallback=t.logoutCallback||null,this.monitoringEnabled)try{this.monitor=new Apigee.MonitoringClient(t)}catch(e){console.log(e)}},Usergrid.Client.prototype.request=function(t,e){var n=this,o=t.method||"GET",r=t.endpoint,s=t.body||{},a=t.qs||{},l=t.mQuery||!1,g=this.get("orgName"),c=this.get("appName");if(!l&&!g&&!c&&"function"==typeof this.logoutCallback)return this.logoutCallback(!0,"no_org_or_app_name_specified");var u;u=l?this.URI+"/"+r:this.URI+"/"+g+"/"+c+"/"+r,n.getToken()&&(a.access_token=n.getToken());var p=i(a);p&&(u+="?"+p),s=JSON.stringify(s);var d=new XMLHttpRequest;d.open(o,u,!0),s&&(d.setRequestHeader("Content-Type","application/json"),d.setRequestHeader("Accept","application/json")),d.onerror=function(t){n._end=(new Date).getTime(),n.logging&&console.log("success (time: "+n.calcTimeDiff()+"): "+o+" "+u),n.logging&&console.log("Error: API call failed at the network level."),clearTimeout(f);var i=!0;"function"==typeof e&&e(i,t)},d.onload=function(t){if(n._end=(new Date).getTime(),n.logging&&console.log("success (time: "+n.calcTimeDiff()+"): "+o+" "+u),clearTimeout(f),t=JSON.parse(d.responseText),200!=d.status){var i=t.error,r=t.error_description;if(n.logging&&console.log("Error ("+d.status+")("+i+"): "+r),("auth_expired_session_token"==i||"auth_missing_credentials"==i||"auth_unverified_oath"==i||"expired_token"==i||"unauthorized"==i||"auth_invalid"==i)&&"function"==typeof n.logoutCallback)return n.logoutCallback(!0,t);"function"==typeof e&&e(!0,t)}else"function"==typeof e&&e(!1,t)};var f=setTimeout(function(){d.abort(),"function"===n._callTimeoutCallback?n._callTimeoutCallback("API CALL TIMEOUT"):n.callback("API CALL TIMEOUT")},n._callTimeout);if(this.logging&&console.log("calling: "+o+" "+u),this.buildCurl){var h={uri:u,body:s,method:o};this.buildCurlCall(h)}this._start=(new Date).getTime(),d.send(s)},Usergrid.Client.prototype.buildAssetURL=function(t){var e=this,n={},o=this.URI+"/"+this.orgName+"/"+this.appName+"/assets/"+t+"/data";e.getToken()&&(n.access_token=e.getToken());var r=i(n);return r&&(o+="?"+r),o},Usergrid.Client.prototype.createGroup=function(t,e){var i=t.getOnExist||!1,t={path:t.path,client:this,data:t},n=new Usergrid.Group(t);n.fetch(function(t,o){var r=t&&"service_resource_not_found"===o.error||"no_name_specified"===o.error||"null_pointer"===o.error||!t&&i;r?n.save(function(t){"function"==typeof e&&e(t,n)}):"function"==typeof e&&e(t,n)})},Usergrid.Client.prototype.createEntity=function(t,e){var i=t.getOnExist||!1,t={client:this,data:t},n=new Usergrid.Entity(t);n.fetch(function(o,r){var s=o&&"service_resource_not_found"===r.error||"no_name_specified"===r.error||"null_pointer"===r.error||!o&&i;s?(n.set(t.data),n.save(function(t,i){"function"==typeof e&&e(t,n,i)})):"function"==typeof e&&e(o,n,r)})},Usergrid.Client.prototype.getEntity=function(t,e){var t={client:this,data:t},i=new Usergrid.Entity(t);i.fetch(function(t,n){"function"==typeof e&&e(t,i,n)})},Usergrid.Client.prototype.restoreEntity=function(t){var e=JSON.parse(t),i={client:this,data:e},n=new Usergrid.Entity(i);return n},Usergrid.Client.prototype.createCollection=function(t,e){t.client=this;var i=new Usergrid.Collection(t,function(t,n){"function"==typeof e&&e(t,i,n)})},Usergrid.Client.prototype.restoreCollection=function(t){var e=JSON.parse(t);e.client=this;var i=new Usergrid.Collection(e);return i},Usergrid.Client.prototype.getFeedForUser=function(t,e){var i={method:"GET",endpoint:"users/"+t+"/feed"};this.request(i,function(t,i){"function"==typeof e&&(t?e(t):e(t,i,i.entities))})},Usergrid.Client.prototype.createUserActivity=function(t,e,i){e.type="users/"+t+"/activities";var e={client:this,data:e},n=new Usergrid.Entity(e);n.save(function(t){"function"==typeof i&&i(t,n)})},Usergrid.Client.prototype.createUserActivityWithEntity=function(t,e,i){var n=t.get("username"),o={actor:{displayName:n,uuid:t.get("uuid"),username:n,email:t.get("email"),picture:t.get("picture"),image:{duration:0,height:80,url:t.get("picture"),width:80}},verb:"post",content:e};this.createUserActivity(n,o,i)},Usergrid.Client.prototype.calcTimeDiff=function(){var t=0,e=this._end-this._start;try{t=(e/10/60).toFixed(2)}catch(i){return 0}return t},Usergrid.Client.prototype.setToken=function(t){this.set("token",t)},Usergrid.Client.prototype.getToken=function(){return this.get("token")},Usergrid.Client.prototype.setObject=function(t,e){e&&(e=JSON.stringify(e)),this.set(t,e)},Usergrid.Client.prototype.set=function(t,e){var i="apigee_"+t;this[t]=e,"undefined"!=typeof Storage&&(e?localStorage.setItem(i,e):localStorage.removeItem(i))},Usergrid.Client.prototype.getObject=function(t){return JSON.parse(this.get(t))},Usergrid.Client.prototype.get=function(t){var e="apigee_"+t;return this[t]?this[t]:"undefined"!=typeof Storage?localStorage.getItem(e):null},Usergrid.Client.prototype.signup=function(t,e,i,n,o){var r={type:"users",username:t,password:e,email:i,name:n};this.createEntity(r,o)},Usergrid.Client.prototype.login=function(t,e,i){var n=this,o={method:"POST",endpoint:"token",body:{username:t,password:e,grant_type:"password"}};this.request(o,function(t,e){var o={};if(t&&n.logging)console.log("error trying to log user in");else{var r={client:n,data:e.user};o=new Usergrid.Entity(r),n.setToken(e.access_token)}"function"==typeof i&&i(t,e,o)})},Usergrid.Client.prototype.reAuthenticateLite=function(t){var e=this,i={method:"GET",endpoint:"management/me",mQuery:!0};this.request(i,function(i,n){i&&e.logging?console.log("error trying to re-authenticate user"):e.setToken(n.access_token),"function"==typeof t&&t(i)})},Usergrid.Client.prototype.reAuthenticate=function(t,e){var i=this,n={method:"GET",endpoint:"management/users/"+t,mQuery:!0};this.request(n,function(t,n){var o={},r={},s={},a=n.data;if(t&&i.logging)console.log("error trying to full authenticate user");else{i.setToken(a.token),i.set("email",a.email),localStorage.setItem("accessToken",a.token),localStorage.setItem("userUUID",a.uuid),localStorage.setItem("userEmail",a.email);var l={username:a.username,email:a.email,name:a.name,uuid:a.uuid},g={client:i,data:l};s=new Usergrid.Entity(g),o=a.organizations;var c="";try{var u=i.get("orgName");c=o[u]?o[u]:o[Object.keys(o)[0]],i.set("orgName",c.name)}catch(p){t=!0,i.logging&&console.log("error selecting org")}r=i.parseApplicationsArray(c),i.selectFirstApp(r),i.setObject("organizations",o),i.setObject("applications",r)}"function"==typeof e&&e(t,a,s,o,r)})},Usergrid.Client.prototype.loginFacebook=function(t,e){var i=this,n={method:"GET",endpoint:"auth/facebook",qs:{fb_access_token:t}};this.request(n,function(t,n){var o={};if(t&&i.logging)console.log("error trying to log user in");else{var r={client:i,data:n.user};o=new Usergrid.Entity(r),i.setToken(n.access_token)}"function"==typeof e&&e(t,n,o)})},Usergrid.Client.prototype.getLoggedInUser=function(t){if(this.getToken()){var e=this,i={method:"GET",endpoint:"users/me"};this.request(i,function(i,n){if(i)e.logging&&console.log("error trying to log user in"),"function"==typeof t&&t(i,n,null);else{var o={client:e,data:n.entities[0]},r=new Usergrid.Entity(o);"function"==typeof t&&t(i,n,r)}})}else t(!0,null,null)},Usergrid.Client.prototype.isLoggedIn=function(){return this.getToken()?!0:!1},Usergrid.Client.prototype.logout=function(){this.setToken(null)},Usergrid.Client.prototype.buildCurlCall=function(t){var e="curl",i=(t.method||"GET").toUpperCase(),n=t.body||{},o=t.uri;return e+="POST"===i?" -X POST":"PUT"===i?" -X PUT":"DELETE"===i?" -X DELETE":" -X GET",e+=" "+o,'"{}"'!==n&&"GET"!==i&&"DELETE"!==i&&(e+=" -d '"+n+"'"),console.log(e),e},Usergrid.Client.prototype.registerDevice=function(t,e){if(t){var i=t.notifier+".notifier.id",n={type:"devices",uuid:this.getDeviceUUID()};n[i]=t.deviceToken;var o={client:this,data:n},r=new Usergrid.Entity(o);r.save(e)}else e(!0)},Usergrid.Client.prototype.sendPushToDevice=function(t,e){if(t){var i=t.notifier,n={type:"notifier",name:t.notifier},o=this;this.getEntity(n,function(n,r){if(n)e(n,r);else{var s={type:t.path};"google"===r.get("provider")?(s.payloads={},s.payloads[i]=t.message):"apple"===r.get("provider")&&(s.payloads={},s.payloads[i]={aps:{alert:t.message,sound:t.sound}});var a={client:o,data:s},l=new Usergrid.Entity(a);l.save(e)}})}else e(!0)},Usergrid.Client.prototype.getDeviceUUID=function(){if("string"==typeof window.localStorage.getItem("deviceUUID"))return window.localStorage.getItem("deviceUUID");var e=t();return window.localStorage.setItem("deviceUUID",e),window.localStorage.getItem("deviceUUID")},Usergrid.Entity=function(t){t&&(this._client=t.client,this._data=t.data||{})},Usergrid.Entity.prototype.serialize=function(){return JSON.stringify(this._data)},Usergrid.Entity.prototype.get=function(t){return t?this._data[t]:this._data},Usergrid.Entity.prototype.set=function(t,e){if("object"==typeof t)for(var i in t)this._data[i]=t[i];else"string"==typeof t?null===e?delete this._data[t]:this._data[t]=e:this._data={}},Usergrid.Entity.prototype.save=function(t){var i=this.get("type"),n="POST";e(this.get("uuid"))&&(n="PUT",i+="/"+this.get("uuid"));var o=this,r={},s=this.get();for(var a in s)"metadata"!==a&&"created"!==a&&"modified"!==a&&"type"!==a&&"activated"!==a&&"uuid"!==a&&(r[a]=s[a]);var l={method:n,endpoint:i,body:r};this._client.request(l,function(e,n){if(e&&o._client.logging){if(console.log("could not save entity"),"function"==typeof t)return t(e,n,o)}else{if(n.entities&&n.entities.length){var r=n.entities[0];o.set(r);for(var a=n.path;"/"===a.substring(0,1);)a=a.substring(1);o.set("type",a)}var l=("user"===o.get("type")||"users"===o.get("type"))&&s.oldpassword&&s.newpassword;if(l){var g={};g.oldpassword=s.oldpassword,g.newpassword=s.newpassword;var c={method:"PUT",endpoint:i+"/password",body:g};o._client.request(c,function(e,i){e&&o._client.logging&&console.log("could not update user"),o.set("oldpassword",null),o.set("newpassword",null),"function"==typeof t&&t(e,i,o)})}else"function"==typeof t&&t(e,n,o)}})},Usergrid.Entity.prototype.fetch=function(t){var e=this.get("type"),i=this;if(void 0===e){var n="cannot fetch entity, no entity type specified";return i._client.logging&&console.log(n),t(!0,n,i)}if(this.get("uuid"))e+="/"+this.get("uuid");else if("users"===e){if(this.get("username"))e+="/"+this.get("username");else if("function"==typeof t){var n="no_name_specified";return i._client.logging&&console.log(n),t(!0,{error:n},i)}}else if(this.get("name"))e+="/"+encodeURIComponent(this.get("name"));else if("function"==typeof t){var n="no_name_specified";return i._client.logging&&console.log(n),t(!0,{error:n},i)}var o={method:"GET",endpoint:e};this._client.request(o,function(e,n){if(e&&i._client.logging)console.log("could not get entity");else if(n.user)i.set(n.user),i._json=JSON.stringify(n.user,null,2);else if(n.entities&&n.entities.length){var o=n.entities[0];i.set(o)}"function"==typeof t&&t(e,n,i)})},Usergrid.Entity.prototype.destroy=function(t){var i=this.get("type");if(e(this.get("uuid")))i+="/"+this.get("uuid");else if("function"==typeof t){var n="Error trying to delete object - no uuid specified.";o._client.logging&&console.log(n),t(!0,n)}var o=this,r={method:"DELETE",endpoint:i};this._client.request(r,function(e,i){e&&o._client.logging?console.log("entity could not be deleted"):o.set(null),"function"==typeof t&&t(e,i)})},Usergrid.Entity.prototype.connect=function(t,e,i){var n=this,o=e.get("type"),r=this.getEntityId(e);if(r){var s=this.get("type"),a=this.getEntityId(this);if(a){var l=s+"/"+a+"/"+t+"/"+o+"/"+r,g={method:"POST",endpoint:l};this._client.request(g,function(t,e){t&&n._client.logging&&console.log("entity could not be connected"),"function"==typeof i&&i(t,e)})}else if("function"==typeof i){var c="Error in connect - no uuid specified.";n._client.logging&&console.log(c),i(!0,c)}}else if("function"==typeof i){var c="Error trying to delete object - no uuid specified.";n._client.logging&&console.log(c),i(!0,c)}},Usergrid.Entity.prototype.getEntityId=function(t){var i=!1;return e(t.get("uuid"))?i=t.get("uuid"):"users"===type?i=t.get("username"):t.get("name")&&(i=t.get("name")),i},Usergrid.Entity.prototype.getConnections=function(t,e){var i=this,n=this.get("type"),o=this.getEntityId(this);if(o){var r=n+"/"+o+"/"+t+"/",s={method:"GET",endpoint:r};this._client.request(s,function(n,o){n&&i._client.logging&&console.log("entity could not be connected"),i[t]={};for(var r=o.entities.length,s=0;r>s;s++)"user"===o.entities[s].type?i[t][o.entities[s].username]=o.entities[s]:i[t][o.entities[s].name]=o.entities[s];"function"==typeof e&&e(n,o,o.entities)})}else if("function"==typeof e){var a="Error in getConnections - no uuid specified.";i._client.logging&&console.log(a),e(!0,a)}},Usergrid.Entity.prototype.getGroups=function(t){var e=this,i="users/"+this.get("uuid")+"/groups",n={method:"GET",endpoint:i};this._client.request(n,function(i,n){i&&e._client.logging&&console.log("entity could not be connected"),e.groups=n.entities,"function"==typeof t&&t(i,n,n.entities)})},Usergrid.Entity.prototype.getActivities=function(t){var e=this,i=this.get("type")+"/"+this.get("uuid")+"/activities",n={method:"GET",endpoint:i};this._client.request(n,function(i,n){i&&e._client.logging&&console.log("entity could not be connected");for(var o in n.entities)n.entities[o].createdDate=new Date(n.entities[o].created).toUTCString();e.activities=n.entities,"function"==typeof t&&t(i,n,n.entities)})},Usergrid.Entity.prototype.getFollowing=function(t){var e=this,i="users/"+this.get("uuid")+"/following",n={method:"GET",endpoint:i};this._client.request(n,function(i,n){i&&e._client.logging&&console.log("could not get user following");for(var o in n.entities){n.entities[o].createdDate=new Date(n.entities[o].created).toUTCString();var r=e._client.getDisplayImage(n.entities[o].email,n.entities[o].picture);n.entities[o]._portal_image_icon=r}e.following=n.entities,"function"==typeof t&&t(i,n,n.entities)})},Usergrid.Entity.prototype.getFollowers=function(t){var e=this,i="users/"+this.get("uuid")+"/followers",n={method:"GET",endpoint:i};this._client.request(n,function(i,n){i&&e._client.logging&&console.log("could not get user followers");for(var o in n.entities){n.entities[o].createdDate=new Date(n.entities[o].created).toUTCString();var r=e._client.getDisplayImage(n.entities[o].email,n.entities[o].picture);n.entities[o]._portal_image_icon=r}e.followers=n.entities,"function"==typeof t&&t(i,n,n.entities)})},Usergrid.Entity.prototype.getRoles=function(t){var e=this,i=this.get("type")+"/"+this.get("uuid")+"/roles",n={method:"GET",endpoint:i};this._client.request(n,function(i,n){i&&e._client.logging&&console.log("could not get user roles"),e.roles=n.entities,"function"==typeof t&&t(i,n,n.entities)})},Usergrid.Entity.prototype.getPermissions=function(t){var e=this,i=this.get("type")+"/"+this.get("uuid")+"/permissions",n={method:"GET",endpoint:i};this._client.request(n,function(i,n){i&&e._client.logging&&console.log("could not get user permissions");var o=[];if(n.data){var r=n.data,s=0;for(var a in r){s++;var l=r[a],g=l.split(":"),c="",u=g[0];g.length>1&&(c=g[0],u=g[1]),c.replace("*","get,post,put,delete");var p=c.split(","),d={};d.get="no",d.post="no",d.put="no",d["delete"]="no";for(var f in p)d[p[f]]="yes";o.push({operations:d,path:u,perm:l})}}e.permissions=o,"function"==typeof t&&t(i,n,n.entities)})},Usergrid.Entity.prototype.disconnect=function(t,e,i){var n=this,o=e.get("type"),r=this.getEntityId(e);if(r){var s=this.get("type"),a=this.getEntityId(this);if(a){var l=s+"/"+a+"/"+t+"/"+o+"/"+r,g={method:"DELETE",endpoint:l};this._client.request(g,function(t,e){t&&n._client.logging&&console.log("entity could not be disconnected"),"function"==typeof i&&i(t,e)})}else if("function"==typeof i){var c="Error in connect - no uuid specified.";n._client.logging&&console.log(c),i(!0,c)}}else if("function"==typeof i){var c="Error trying to delete object - no uuid specified.";n._client.logging&&console.log(c),i(!0,c)}},Usergrid.Collection=function(t,e){if(t&&(this._client=t.client,this._type=t.type,this.qs=t.qs||{},this._list=t.list||[],this._iterator=t.iterator||-1,this._previous=t.previous||[],this._next=t.next||null,this._cursor=t.cursor||null,t.list))for(var i=t.list.length,n=0;i>n;n++){var o=this._client.restoreEntity(t.list[n]);this._list[n]=o}e&&this.fetch(e)},Usergrid.Collection.prototype.serialize=function(){var t={};t.type=this._type,t.qs=this.qs,t.iterator=this._iterator,t.previous=this._previous,t.next=this._next,t.cursor=this._cursor,this.resetEntityPointer();var e=0;for(t.list=[];this.hasNextEntity();){var i=this.getNextEntity();t.list[e]=i.serialize(),e++}return t=JSON.stringify(t)},Usergrid.Collection.prototype.addCollection=function(t,e,i){self=this,e.client=this._client;var n=new Usergrid.Collection(e,function(e){if("function"==typeof i){for(n.resetEntityPointer();n.hasNextEntity();){var o=n.getNextEntity();o.get("email");var r=self._client.getDisplayImage(o.get("email"),o.get("picture"));o._portal_image_icon=r}self[t]=n,i(e,n)}})},Usergrid.Collection.prototype.fetch=function(t){var e=this,i=this.qs;this._cursor?i.cursor=this._cursor:delete i.cursor;var n={method:"GET",endpoint:this._type,qs:this.qs};this._client.request(n,function(i,n){if(i&&e._client.logging)console.log("error getting collection");else{var o=n.cursor||null;if(e.saveCursor(o),n.entities){e.resetEntityPointer();var r=n.entities.length;e._list=[];for(var s=0;r>s;s++){var a=n.entities[s].uuid;if(a){var l=n.entities[s]||{};e._baseType=n.entities[s].type,l.type=e._type;var g={type:e._type,client:e._client,uuid:a,data:l},c=new Usergrid.Entity(g);c._json=JSON.stringify(l,null,2);var u=e._list.length;e._list[u]=c}}}}"function"==typeof t&&t(i,n)})},Usergrid.Collection.prototype.addEntity=function(t,e){var i=this;t.type=this._type,this._client.createEntity(t,function(t,n){if(!t){var o=i._list.length;i._list[o]=n}"function"==typeof e&&e(t,n)})},Usergrid.Collection.prototype.addExistingEntity=function(t){var e=this._list.length;this._list[e]=t},Usergrid.Collection.prototype.destroyEntity=function(t,e){var i=this;t.destroy(function(t,n){t?(i._client.logging&&console.log("could not destroy entity"),"function"==typeof e&&e(t,n)):i.fetch(e)}),this.removeEntity(t)},Usergrid.Collection.prototype.removeEntity=function(t){var e=t.get("uuid");for(var i in this._list){var n=this._list[i];if(n.get("uuid")===e)return this._list.splice(i,1)}return!1},Usergrid.Collection.prototype.getEntityByUUID=function(t,e){for(var i in this._list){var n=this._list[i];if(n.get("uuid")===t)return n}var o={data:{type:this._type,uuid:t},client:this._client},r=new Usergrid.Entity(o);r.fetch(e)},Usergrid.Collection.prototype.getFirstEntity=function(){var t=this._list.length;return t>0?this._list[0]:null},Usergrid.Collection.prototype.getLastEntity=function(){var t=this._list.length;return t>0?this._list[t-1]:null},Usergrid.Collection.prototype.hasNextEntity=function(){var t=this._iterator+1,e=t>=0&&t<this._list.length;return e?!0:!1},Usergrid.Collection.prototype.getNextEntity=function(){this._iterator++;var t=this._iterator>=0&&this._iterator<=this._list.length;return t?this._list[this._iterator]:!1},Usergrid.Collection.prototype.hasPrevEntity=function(){var t=this._iterator-1,e=t>=0&&t<this._list.length;return e?!0:!1},Usergrid.Collection.prototype.getPrevEntity=function(){this._iterator--;var t=this._iterator>=0&&this._iterator<=this._list.length;return t?this.list[this._iterator]:!1},Usergrid.Collection.prototype.resetEntityPointer=function(){this._iterator=-1},Usergrid.Collection.prototype.saveCursor=function(t){this._next!==t&&(this._next=t)},Usergrid.Collection.prototype.resetPaging=function(){this._previous=[],this._next=null,this._cursor=null},Usergrid.Collection.prototype.hasNextPage=function(){return this._next},Usergrid.Collection.prototype.getNextPage=function(t){this.hasNextPage()&&(this._previous.push(this._cursor),this._cursor=this._next,this._list=[],this.fetch(t))},Usergrid.Collection.prototype.hasPreviousPage=function(){return this._previous.length>0},Usergrid.Collection.prototype.getPreviousPage=function(t){this.hasPreviousPage()&&(this._next=null,this._cursor=this._previous.pop(),this._list=[],this.fetch(t))},Usergrid.Group=function(t){this._path=t.path,this._list=[],this._client=t.client,this._data=t.data||{},this._data.type="groups"},Usergrid.Group.prototype=new Usergrid.Entity,Usergrid.Group.prototype.fetch=function(t){var e=this,i="groups/"+this._path,n="groups/"+this._path+"/users",o={method:"GET",endpoint:i},r={method:"GET",endpoint:n};this._client.request(o,function(i,n){if(i)e._client.logging&&console.log("error getting group"),"function"==typeof t&&t(i,n);else if(n.entities){var o=n.entities[0];e._data=o||{},e._client.request(r,function(i,n){if(i&&e._client.logging)console.log("error getting group users");else if(n.entities){var o=n.entities.length;e._list=[];for(var r=0;o>r;r++){var s=n.entities[r].uuid;if(s){var a=n.entities[r]||{},l={type:a.type,client:e._client,uuid:s,data:a},g=new Usergrid.Entity(l);e._list.push(g)}}}"function"==typeof t&&t(i,n,e._list)})}})},Usergrid.Group.prototype.members=function(t){"function"==typeof t&&t(null,this._list)},Usergrid.Group.prototype.add=function(t,e){var i=this,t={method:"POST",endpoint:"groups/"+this._path+"/users/"+t.user.get("username")};this._client.request(t,function(t,n){t?"function"==typeof e&&e(t,n,n.entities):i.fetch(e)})},Usergrid.Group.prototype.remove=function(t,e){var i=this,t={method:"DELETE",endpoint:"groups/"+this._path+"/users/"+t.user.get("username")};this._client.request(t,function(t,n){t?"function"==typeof e&&e(t,n):i.fetch(e)})},Usergrid.Group.prototype.feed=function(t){var e=this,i="groups/"+this._path+"/feed",n={method:"GET",endpoint:i};this._client.request(n,function(i,n){i&&e.logging&&console.log("error trying to log user in"),"function"==typeof t&&t(i,n,n.entities)})},Usergrid.Group.prototype.createGroupActivity=function(t,e){var i=t.user,t={actor:{displayName:i.get("username"),uuid:i.get("uuid"),username:i.get("username"),email:i.get("email"),picture:i.get("picture"),image:{duration:0,height:80,url:i.get("picture"),width:80}},verb:"post",content:t.content};t.type="groups/"+this._path+"/activities";var t={client:this._client,data:t},n=new Usergrid.Entity(t);n.save(function(t){"function"==typeof e&&e(t,n)})},Usergrid.Client.prototype.logVerbose=function(t){this.monitor.logVerbose(t)},Usergrid.Client.prototype.logDebug=function(t){this.monitor.logDebug(t)},Usergrid.Client.prototype.logInfo=function(t){this.monitor.logInfo(t)},Usergrid.Client.prototype.logWarn=function(t){this.monitor.logWarn(t)},Usergrid.Client.prototype.logError=function(t){this.monitor.logError(t)},Usergrid.Client.prototype.logAssert=function(t){this.monitor.logAssert(t)},Usergrid}(),Apigee=function(){function t(t){var e=t||{},n={logLevel:g.assert,logMessage:e.logMessage,tag:e.tag,timeStamp:i()};d.push(n)}function e(){for(var t=[],e="0123456789ABCDEF",i=0;36>i;i++)t[i]=Math.floor(16*Math.random());t[14]=4,t[19]=8|3&t[19];for(var i=0;36>i;i++)t[i]=e[t[i]];return t[8]=t[13]=t[18]=t[23]="-",t.join("")}function i(){return(new Date).getTime().toString()}function n(){if(null===typeof window.localStorage.getItem("uuid"))return window.localStorage.getItem("uuid");var t=e();return window.localStorage.setItem("uuid",t),window.localStorage.getItem("uuid")}function o(){return"undefined"!=typeof cordova||"undefined"!=typeof PhoneGap||"undefined"!=typeof window.device}function r(){return"undefined"!=typeof window.forge}function s(){return"undefined"!=typeof Titanium}function a(){var t,e,i,n=navigator.userAgent,o=navigator.appName,r=u,s={devicePlatform:u,deviceOSVersion:u};return-1!=(e=n.indexOf("Opera"))?(o="Opera",r=n.substring(e+6),-1!=(e=n.indexOf("Version"))&&(r=n.substring(e+8))):-1!=(e=n.indexOf("MSIE"))?(o="Microsoft Internet Explorer",r=n.substring(e+5)):-1!=(e=n.indexOf("Chrome"))?(o="Chrome",r=n.substring(e+7)):-1!=(e=n.indexOf("Safari"))?(o="Safari",r=n.substring(e+7),-1!=(e=n.indexOf("Version"))&&(r=n.substring(e+8))):-1!=(e=n.indexOf("Firefox"))?(o="Firefox",r=n.substring(e+8)):(t=n.lastIndexOf(" ")+1)<(e=n.lastIndexOf("/"))&&(o=n.substring(t,e),r=n.substring(e+1),o.toLowerCase()==o.toUpperCase()&&(o=navigator.appName)),-1!=(i=r.indexOf(";"))&&(r=r.substring(0,i)),-1!=(i=r.indexOf(" "))&&(r=r.substring(0,i)),s.devicePlatform=o,s.deviceOSVersion=r,s}var l={get:"GET",post:"POST",put:"PUT",del:"DELETE",head:"HEAD"},g={verbose:"V",debug:"D",info:"I",warn:"W",error:"E",assert:"A"},c={verbose:2,debug:3,info:4,warn:5,error:6,assert:7},u="UNKNOWN",p="JavaScript",d=[],f=[],h=Usergrid;return h.MonitoringClient=function(t){if(this.orgName=t.orgName,this.appName=t.appName,this.syncOnClose=t.syncOnClose||!1,this.testMode=t.testMode||!1,this.URI="undefined"==typeof t.URI?"https://api.usergrid.com":t.URI,this.syncDate=i(),"undefined"!=typeof t.config?(this.configuration=t.config,this.deviceConfig=this.configuration.deviceLevelOverrideEnabled===!0?this.configuration.deviceLevelAppConfig:this.abtestingOverrideEnabled===!0?this.configuration.abtestingAppConfig:this.configuration.defaultAppConfig):(this.configuration=null,this.downloadConfig()),null!==this.configuration&&"undefined"!==this.configuration){var e=0;if(this.deviceConfig.samplingRate<100&&(e=Math.floor(101*Math.random())),e<this.deviceConfig.samplingRate){this.appId=this.configuration.instaOpsApplicationId,this.appConfigType=this.deviceConfig.appConfigType,this.deviceConfig.enableLogMonitoring&&this.patchLoggingCalls();var n=3e3;"undefined"!=typeof this.deviceConfig.agentUploadIntervalInSeconds&&(n=1e3*this.deviceConfig.agentUploadIntervalInSeconds);var a=this;this.syncOnClose?o()?window.addEventListener("pause",function(){a.prepareSync()},!1):r()?forge.event.appPaused.addListener(function(){},function(t){console.log("Error syncing data."),console.log(t)}):s()||window.addEventListener("beforeunload",function(){a.prepareSync()}):setInterval(function(){a.prepareSync()},n),this.deviceConfig.networkMonitoringEnabled&&this.patchNetworkCalls(XMLHttpRequest),window.onerror=h.MonitoringClient.catchCrashReport,this.startSession()}}else console.log("Error: Apigee APM configuration unavailable.")},h.MonitoringClient.prototype.downloadConfig=function(t){function e(){if(4===i.readyState)if("function"==typeof t)200===i.status?t(null,JSON.parse(i.responseText)):t(i.statusText);else if(200===i.status){var e=JSON.parse(i.responseText);o.configuration=e,o.deviceConfig=e.deviceLevelOverrideEnabled===!0?e.deviceLevelAppConfig:o.abtestingOverrideEnabled===!0?e.abtestingAppConfig:e.defaultAppConfig,o.prepareSync()}}var i=new XMLHttpRequest,n=this.URI+"/"+this.orgName+"/"+this.appName+"/apm/apigeeMobileConfig";"function"==typeof t?i.open(l.get,n,!0):i.open(l.get,n,!1);var o=this;i.setRequestHeader("Accept","application/json"),i.setRequestHeader("Content-Type","application/json"),i.onreadystatechange=e,i.send()},h.MonitoringClient.prototype.sync=function(t){var e={};e.logs=t.logs,e.metrics=t.metrics,e.sessionMetrics=this.sessionMetrics,e.orgName=this.orgName,e.appName=this.appName,e.fullAppName=this.orgName+"_"+this.appName,e.instaOpsApplicationId=this.configuration.instaOpsApplicationId,e.timeStamp=i();var n=new XMLHttpRequest,o=this.URI+"/"+this.orgName+"/"+this.appName+"/apm/apmMetrics";n.open(l.post,o,!1),n.setRequestHeader("Accept","application/json"),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify(e)),200===n.status?(d=[],f=[],n.responseText):(console.log("Error syncing"),console.log(n.responseText))},h.MonitoringClient.catchCrashReport=function(e,i,n){t({tag:"CRASH",logMessage:"Error:"+e+" for url:"+i+" on line:"+n})},h.MonitoringClient.prototype.startSession=function(){function t(t){g.sessionMetrics.latitude=t.coords.latitude,g.sessionMetrics.longitude=t.coords.longitude}function l(){console.log("Location access is not available.")}if(null!==this.configuration&&"undefined"!==this.configuration){var g=this,c={};if(c.timeStamp=i(),c.appConfigType=this.appConfigType,c.appId=this.appId.toString(),c.applicationVersion="undefined"!=typeof this.appVersion?this.appVersion.toString():u,c.batteryLevel="-100",c.deviceCountry=u,c.deviceId=u,c.deviceModel=u,c.deviceOSVersion=u,c.devicePlatform=u,c.localCountry=u,c.localLanguage=u,c.networkCarrier=u,c.networkCountry=u,c.networkSubType=u,c.networkType=u,c.sdkType=p,c.sessionId=e(),c.sessionStartTime=c.timeStamp,g.deviceConfig.locationCaptureEnabled&&"undefined"!=typeof navigator.geolocation&&navigator.geolocation.getCurrentPosition(t,l),o())"device"in window?(c.devicePlatform=window.device.platform,c.deviceOSVersion=window.device.version,c.deviceModel=window.device.name):window.cordova&&(c.devicePlatform=window.cordova.platformId,c.deviceOSVersion=u,c.deviceModel=u),"connection"in navigator&&(c.networkType=navigator.connection.type||u),c.deviceId=g.deviceConfig.deviceIdCaptureEnabled?g.deviceConfig.obfuscateDeviceId?n():window.device.uuid:this.deviceConfig.obfuscateDeviceId?n():u;else if(r()){var d=u;forge.is.ios()?d="iOS":forge.is.android()&&(d="Android"),c.devicePlatform=u,c.deviceOSVersion=d,c.deviceId=g.deviceConfig.deviceIdCaptureEnabled?n():u,c.deviceModel=u,c.networkType=forge.is.connection.wifi()?"WIFI":u}else if(s())Ti.App.addEventListener("analytics:platformMetrics",function(t){c.devicePlatform=t.name,c.deviceOSVersion=t.osname,c.deviceId=g.deviceConfig.deviceIdCaptureEnabled?g.deviceConfig.obfuscateDeviceId?n():t.uuid:this.deviceConfig.obfuscateDeviceId?n():u,c.deviceModel=t.model,c.networkType=t.networkType});else if("undefined"!=typeof window.localStorage&&g.deviceConfig.deviceIdCaptureEnabled&&(c.deviceId=n()),"undefined"!=typeof navigator.userAgent){var f=a();c.devicePlatform=f.devicePlatform,c.deviceOSVersion=f.deviceOSVersion,c.applicationVersion===u&&"undefined"!=typeof navigator.appVersion&&(c.applicationVersion=navigator.appVersion),"undefined"!=typeof navigator.language&&(c.localLanguage=navigator.language)}g.sessionMetrics=c,s()&&Ti.App.fireEvent("analytics:attachReady")}},h.MonitoringClient.prototype.patchNetworkCalls=function(t){"use strict";var e=this,n=t.prototype.open,o=t.prototype.send;t.prototype.open=function(t,e,i,o,r){this._method=t,this._url=e,n.call(this,t,e,i,o,r)},t.prototype.send=function(t){function n(){if(4==a.readyState){var t=e.getMonitoringURL();if(-1===l.indexOf("/!gap_exec")&&-1===l.indexOf(t)){var n=i(),o=n-r,g={url:l,startTime:r.toString(),endTime:n.toString(),numSamples:"1",latency:o.toString(),timeStamp:r.toString(),httpStatusCode:a.status.toString(),responseDataSize:a.responseText.length.toString()};200==a.status?(g.numErrors="0",e.logNetworkCall(g)):(g.numErrors="1",e.logNetworkCall(g))}}s&&s()}var r,s,a=this;this._method;var l=this._url;this.noIntercept||(r=i(),this.addEventListener?this.addEventListener("readystatechange",n,!1):(s=this.onreadystatechange,this.onreadystatechange=n)),o.call(this,t)
}},h.MonitoringClient.prototype.patchLoggingCalls=function(){var t=this,e=window.console;if(window.console={log:function(){t.logInfo({tag:"CONSOLE",logMessage:arguments[0]}),e.log.apply(e,arguments)},warn:function(){t.logWarn({tag:"CONSOLE",logMessage:arguments[0]}),e.warn.apply(e,arguments)},error:function(){t.logError({tag:"CONSOLE",logMessage:arguments[0]}),e.error.apply(e,arguments)},assert:function(){t.logAssert({tag:"CONSOLE",logMessage:arguments[1]}),e.assert.apply(e,arguments)},debug:function(){t.logDebug({tag:"CONSOLE",logMessage:arguments[0]}),e.debug.apply(e,arguments)}},s()){var i=Ti.API;window.console.log=function(){i.info.apply(i,arguments)},Ti.API={info:function(){t.logInfo({tag:"CONSOLE_TITANIUM",logMessage:arguments[0]}),i.info.apply(i,arguments)},log:function(){var e=arguments[0];"info"===e?t.logInfo({tag:"CONSOLE_TITANIUM",logMessage:arguments[1]}):"warn"===e?t.logWarn({tag:"CONSOLE_TITANIUM",logMessage:arguments[1]}):"error"===e?t.logError({tag:"CONSOLE_TITANIUM",logMessage:arguments[1]}):"debug"===e?t.logDebug({tag:"CONSOLE_TITANIUM",logMessage:arguments[1]}):"trace"===e?t.logAssert({tag:"CONSOLE_TITANIUM",logMessage:arguments[1]}):t.logInfo({tag:"CONSOLE_TITANIUM",logMessage:arguments[1]}),i.log.apply(i,arguments)}}}},h.MonitoringClient.prototype.prepareSync=function(){var t={},e=this;"undefined"!=typeof e.sessionMetrics&&(t.sessionMetrics=e.sessionMetrics);var n=!1;this.syncDate=i(),f.length>0&&(n=!0),d.length>0&&(n=!0),t.logs=d,t.metrics=f,n&&!e.testMode&&this.sync(t)},h.MonitoringClient.prototype.logMessage=function(t){var e=t||{},n={logLevel:e.logLevel,logMessage:e.logMessage.substring(0,250),tag:e.tag,timeStamp:i()};d.push(n)},h.MonitoringClient.prototype.logVerbose=function(t){var e=t||{};e.logLevel=g.verbose,this.deviceConfig.logLevelToMonitor>=c.verbose&&this.logMessage(t)},h.MonitoringClient.prototype.logDebug=function(t){var e=t||{};e.logLevel=g.debug,this.deviceConfig.logLevelToMonitor>=c.debug&&this.logMessage(t)},h.MonitoringClient.prototype.logInfo=function(t){var e=t||{};e.logLevel=g.info,this.deviceConfig.logLevelToMonitor>=c.info&&this.logMessage(t)},h.MonitoringClient.prototype.logWarn=function(t){var e=t||{};e.logLevel=g.warn,this.deviceConfig.logLevelToMonitor>=c.warn&&this.logMessage(t)},h.MonitoringClient.prototype.logError=function(t){var e=t||{};e.logLevel=g.error,this.deviceConfig.logLevelToMonitor>=c.error&&this.logMessage(t)},h.MonitoringClient.prototype.logAssert=function(t){var e=t||{};e.logLevel=g.assert,this.deviceConfig.logLevelToMonitor>=c.assert&&this.logMessage(t)},h.MonitoringClient.prototype.logNetworkCall=function(t){f.push(t)},h.MonitoringClient.prototype.getMonitoringURL=function(){return this.URI+"/"+this.orgName+"/"+this.appName+"/apm/"},h.MonitoringClient.prototype.getConfig=function(){},h.MonitoringClient.prototype.logs=function(){return d},h.MonitoringClient.prototype.metrics=function(){return f},h.MonitoringClient.prototype.getSessionMetrics=function(){return this.sessionMetrics},h.MonitoringClient.prototype.clearMetrics=function(){d=[],f=[]},h}();