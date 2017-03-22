/**
 * Created by NINI on 2017/3/22.
 */

require.config({
    baseUrl:'/public',
    paths:{
        jquery:'assets/jquery/jquery.min',
        cookie:'assets/jquery-cookie/jquery.cookie',
        echarts:'assets/echarts/echarts.min',
        template:'assets/artTemplate/template',
        bootstrap:'assets/bootstrap/js/bootstrap',
        nprogress:'assets/nprogress/nprogress'
    },
    shim:{
        bootstrap:{
            deps:['jquery']

        }
    }
});