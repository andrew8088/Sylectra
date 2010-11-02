var SYLECTRA = function (selector) {
    if (selector.indexOf('#') > -1) {
        selector = selector.split('#');
        selector = '#' + selector[selector.length -1];
    }
    selector = selector.split(' ');
    var i, len = selector.length, curr_col = document;
    
    var fns = {
        // @param `sel` string : the id of an element
        id : function (sel) {
            return document.getElementById(sel);
        },
        // @param `sel` string : a class name
        // @param `par` Node or NodeList (optional) : the parent element(s) for the selector; defaults to `document`
        klass : function (sel, par) {
            var i = 0, arr = [];
            par = par || document;
            if (par.length) {
                for (; par[i]; i++) {
                   Array.prototype.push.apply(arr, Array.prototype.slice.call(par[i].getElementsByClassName(sel))); 
                }
                return (arr.length === 1) ? arr[0] : arr;
            }
            par = par.getElementsByClassName(sel);
            return (par.length === 1) ? par[0] : par;
        },
        // @param `sel` string : an element name
        // @param `par` Node or NodeList (optional) : the parent element(s) for the selector; defaults to `document`
        element : function (sel, par) {
            var i = 0, arr = [];
            par = par || document;
            if (par.length) {
                for (; par[i]; i++) {
                    Array.prototype.push.apply(arr, Array.prototype.slice.call(par[i].getElementsByTagName(sel)));
                }
                return (arr.length === 1) ? arr[0] : arr;
            }
            par = par.getElementsByTagName(sel);
            return (par.length === 1) ? par[0] : par;
        }
    };
        
    for ( i = 0; i < len; i++ ) {
        var element = selector[i], par = curr_col; 
        //curr_col = find(selector[i], curr_col);
         if (element.indexOf('#') === 0) {
             curr_col = fns.id(element.split('#')[1]);
        } else if (element.indexOf('.') > -1) {
            var arr = [], i;
            element = element.split('.');
            if (element[0]) { // if there's an element prefixed on the class name
                par = fns.element(element[0], par);
                if (par.length) {
                    for (i = 0; par[i]; i++) {
                        if(par[i].className.indexOf(element[1]) > -1) {
                            arr.push(par[i]);
                        }
                    }
                     curr_col = arr;
                } else {
                     curr_col = par;
                }
            } else {
                 curr_col = fns.klass(element[1], par);
            }
        } else { // regular element selector
             curr_col = fns.element(element, par);
        }  
    }

    return curr_col;
};
