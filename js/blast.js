;(function($,window,document,undefined){
	var Blast = function(ele,opt){
		var $element,defaults,options;
		$element = ele,
        defaults = {},
        options = $.extend({}, this.defaults, opt);
	}
	Blast.prototype = {
        globalAlignment: function(s1,s2) {
            var MATCH=1,MISMATCH=-1,GAP=-1;
            var m=s1.length;
            var n=s2.length;
            /*matrix and pointer*/
            var matrix=new Array();
            var pointer=new Array();
            for(var i=0;i<=n;i++){
            	matrix[i]=new Array();
            	pointer[i]=new Array();
            }
            /* 1 initialization*/
            matrix[0][0]=0;
            for(var i=1;i<=m;i++){
            	matrix[0][i]=GAP*i;
            	pointer[0][i]='left';
            }
            for(var i=1;i<=n;i++){
            	matrix[i][0]=GAP*i;
            	pointer[i][0]='up';
            }
            /* 2 fill*/
            for(var i=1;i<=n;i++){
            	for(var j=1;j<=m;j++){
            		var diagonal,left,up;
            		var c1=s1.charAt(j);
            		var c2=s2.charAt(i);
            		/*match score*/
            		if(c1==c2){
            			diagonal=matrix[i-1][j-1]+MATCH;
            		}else{
            			diagonal=matrix[i-1][j-1]+MISMATCH;
            		}
            		/*gap score*/
            		up=matrix[i-1][j]+GAP;
            		left=matrix[i][j-1]+GAP;
            		/*choose best*/
            		if(diagonal>up){
            			if(diagonal>left){
            				matrix[i][j]=diagonal;
            				pointer[i][j]='diagonal'
            			}else{
            				matrix[i][j]=left;
            				pointer[i][j]='left'
            			}
            		}else{
            			if(up>left){
							matrix[i][j]=up;
            				pointer[i][j]='up'
            			}else{
							matrix[i][j]=left;
            				pointer[i][j]='left'
            			}
            		}
            	}
            }


        },
        localAlignment:function(s1,s2){
        	console.log("local alignment");
        }
    }
	$.fn.blast=function(options){
		var blast=new Blast(this,options);
		return blast;
	}
})(jQuery,window,document);

