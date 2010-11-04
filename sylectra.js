var SYLECTRA = function (selector) {

    var i, len, curr_col, element, par, ret_arr = [], fns;

    if (selector.indexOf('#') > 0) {
        selector = selector.split('#');
        selector = '#' + selector[selector.length -1];
    }
    selector = selector.split(' ');

    fns = {
        // @param `sel` string : the id of an element
        id : function (sel) {
            return document.getElementById(sel);
        },
        // @param `c_or_e` string : defines whether we're getting by class or element name; is either 'class' or 'elements'
        // @param `sel` string : a class name
        // @param `par` Node or NodeList (optional) : the parent element(s) for the selector; defaults to `document`
        get : function (c_or_e, sel, par) {
            var i = 0, len, arr = [], get_what = (c_or_e === 'class') ? 'getElementsByClassName' : 'getElementsByTagName';
            if (par.length) {
               while (par[i]) { Array.prototype.push.apply(arr, Array.prototype.slice.call(par[i++][get_what](sel))); }
            } else {
                arr = par[get_what](sel);
            }
            return (arr.length === 1) ? arr[0] : arr;
        }
    };
        

    len = selector.length;
    curr_col = document;

    for ( i = 0; i < len; i++ ) {
        element = selector[i];
        par = curr_col; 
         if (element.indexOf('#') === 0) {
             curr_col = fns.id(element.split('#')[1]);
        } else if (element.indexOf('.') > -1) {
            element = element.split('.');
            if (element[0]) { // if there's an element prefixed on the class name
                par = fns.get('elements', element[0], par);
                if (par.length) {
                    for (i = 0; par[i]; i++) {
                        if(par[i].className.indexOf(element[1]) > -1) {
                            ret_arr.push(par[i]);
                        }
                    }
                     curr_col = ret_arr;
                } else {
                     curr_col = (par.className.indexOf(element[1]) > -1) ? par : [];
                }
            } else {
                 curr_col = fns.get('class', element[1], par);
            }
        } else { // regular element selector
             curr_col = fns.get('elements', element, par);
        }  
    }

    return curr_col;
};
