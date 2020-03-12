function initMap(json,wardCurlat,wardCurlong) {
    // map options
    var options ={
        zoom:18,
        center:{lat:  wardCurlat, lng: wardCurlong}

    }
    
    //New map
    var map = new google.maps.Map(
        document.getElementById('map'), options);

        var mapArray =[];
        for(var l = 0;l < json.length;l++){

            if (json[l].police.length > 0 ){

                for (var z =0;z<json[l].police.length;z++){

                    console.log(json[l].police[z].location.latitude,json[l].police[z].location.longitude);

                    var tempAtt=[];
                    
                    tempAtt.push(json[l].police[z].location.latitude,json[l].police[z].location.longitude,json[l].police[z].category);
                    mapArray.push(tempAtt);
                   
                }
                
            }



        }

        console.log(mapArray);

        for (var r=0;r <mapArray.length;r++){

            console.log(parseFloat(mapArray[0]));
            var newLat = parseFloat(mapArray[r][0]) + (Math.random() -.5) / 1500;// * (Math.random() * (max - min) + min);
            var newLng = parseFloat(mapArray[r][1]) + (Math.random() -.5) / 1500;// * (Math.random() * (max - min) + min);

            addMarker({
                latz:newLat,
                longz:newLng,
                icon:'data:image/png;base64,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',
                content:'<h1>'+mapArray[r][2]+'</h1>'
            
            });
        }   
       

        /*
    $.each(json, function(i){

       

        var length = json[i].length;

        console.log(length);
        for(var l = 0;l < length;l++){

            console.log("test lat",json[i][l].location.latitude);
            console.log(json[i][l].location.longitude);
            
            
            //$(".latestCrime").append("<li class='my-list list-group-item d-flex justify-content-between align-items-center'>% "+json_police[i][l].category+"<span class='badge badge-primary badge-pill'>"+json_police[i][l].month+"</span></div>");
            /*
            addMarker({
                latz:json[i][l].location.latitude,
                longz:json[i][l].location.longitude,
                icon:'data:image/png;base64,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',
                content:'<h1>Dawid home</h1>'
            
            });
            */
        //}
        
       // });
    
/*
    addMarker({
        latz:51.467038,
        longz:-2.537563,
        icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAATIUlEQVR4Xu2aCXhU1dnHf+dO9o0ECEsykyDQslYqi1XBDUEERChIqUJVMkHBDaQgULcgUpQqiAhVTKJQESsIIoq4KyJLixD2LUAgEwhJIHtmJjNzT59zJ/sCJFD8vrZvnjyZzD33nPP+z7u/R/BfTuK/nH/+B8D/JOC/HIGfXwUiHw4hoHQwuvwVIBH8SJOCb9i3svRKnM3PC4AlfixSzgWa12A2D1hKgONZUpcX/DuB+LkAEJitXwO3KuY6tWvKjT2i0DT4ccdp9hw+W8azyECK8WS89cm/C4SfBwBz3GMgXlNMzZl8A3EjOiFE5VZ2H8ph5qJ/8MP2U2V8yyexJf/l3wHClQegzQNtcJtSAdPSF/sz6JZ2hEd2QkoPeVn7K3jUdclbK/fx3MJtqM/AXGxJ0w07cRnpygNgiZ+PlJPGjezC7CeuJ6Llr/DxC8blLCQva18t1j784igPz/wOKSVI+RQZyX++jPz/DIGQ2ZoGxO5YfQ/mVsGEt+gMCPJzDiF1d528LVt7kCkvbSpXhzHYkpdfLhCurAQol+fvLIyMCGTfp6MbxMPiFXtIWLhNgWVHE704+VZtcWnQjN7BVxYAS1wUUmTEtA5l+4ejGrzdx1/YyPvrDyszcJCWPlfz0xJXgyep8cKVBYCRJsxhTmUAbd/H4eerNWj/JXYXt96/huO2AnV0j5CetLhBE9Qx+AoDAJite4Cu78+7g77XmRu8/w0/nOC+aV+q93LwM7Xn2JL8Bk9S5YWfA4CZwLOjh3Rg/owb6927y6Pz6MzvufuOdvS/IaZinPIGwx75lC0pmUoK5pCe9Kf/XwBYrF2R7IkI82fvp6PxNdWtBkrc29y2FHOrEHas/n01HlMOZnN73Fr1XTFO/1ZkLy5qLAhXXgLUuZmtB4AOKxcM5OZe0fXu/an5W/jnniy+SB5aa4ySgs07T6uw6AEykpb+3wKg/WP+2B390eRIpLwPWI0wPUn6kqPGRqOtLyB46r6hHXl5Wh/SMwt5+tWtzJ50gxEbVCUl8lXD5PJnKz49zMTZG9W/32FLuhXvmrEIva0xRmrHCAw4QepCZXTrpcsrAUZq65wkdPmYFKJFHaumIMQqPHIfGmuaRQSwZ+1ovtpy0jBsY+7qwLzp9duFqvMVFbvoMmQ5docRPH0L3AzU1Ccd+AzkImwxn0OC+r8aXT4ALON6IfX3gPZqhWu7BNC7awA7j5QSEij4fqedwpJq66t83+/DhYPo3qkFgx76mFuvjSbhsd9ctDSPf+4bVn95zBgf4KfRMdaXtlE+xv/HTrk5eMKFo7R8TVGELbEJUG0TlwcAs/UOgfxEIkyK8dkPNaNbe/9qjJS6JBtT7KzbVMyGrcXkFnr38cBvOzF3am8j1lfhvqYJ3l69n7HDVYgMzyzYyk29oio9gUPlUYrj9ixfd4gn5vxAmyhfvn4tmtCg6gKgAF/xZSFPv1mWXgtuJj3J0JtyunQAYuJ7CCk3SknQhN824Zm4ZviYqqwgdYR0ILXAisDT5ZG8u6GQaYtyiIzwZ/fHYzCZKrdyLD2fN/++l2nxPbA+/TXzZ9xEm+hQ76RVAFDjrhu1ktBAjdRVsXXaCvXKfc9nsmFriVp/EbbERy8fAG0eCMdtSlHJzegBYcx7vFmtTWjOVIQ7m6w8XwqcIbS1hCBNYUgRROd7Mzib7+Gj12/nhu6Vvl5tcPWXR1n20QFemtqbDm0i6lQLKXWuHvIuZ86VsnmJhfZm3zrHLVyZx6y3z6lnu7Eldbt8AJjjXwP52DW/9OeTV6LwrXKKahHhPo3mTONAug99Jjcz1l0wIZ8xfR2GNDyzLILF63yxDjMz58kBtVITZ6kHf7+q4lSDP72E+6Z+xoYtuSQ/1ZI7e1f3IOWjt+x1MPTJU8pllpCRVG1Q41WgtTVW+HBECHy/X2yhQ0wN9D0FmBwHyCuGftMiOH7Ga5wUKQDmxhew74QP/Wc0pWVTX3at7IsWqELji9ySUgVZysw301j0wSnGD2vC8w96Qa5Jdqek3d3HcSuz4zFFcmpJzqXbgGjrIgQPjxkQyryJkdXXlKVo9t3oHhf3zAnn6xTDIKYgeQMh5oMMvLqtm7cn5zHomQjO5Jr45NXOXHtNW/BtVScTtb50HAHdwfLPsnjileP07OjP+nnRZOW6WfFFEbOXGiLPBy+04pbuQfR/PINdqU4Q4lHSExddOgBmqwpq2v7wRo3Tlzomxz7Qi5j1XgivrjEk7iw+np6kvZNGdFw3hPgQaBce7PUEecUa437bitmPxIIpCHwiQXeC+yz4NAPfMoA9hVBq8+5d+INezObdBQybfAAfk2DAdUF8vrUYt6c6XEo13G7YsK1YvbgeW+LgSwMgaqwFTTvZNEzjwIrq1rfc6H28JYCx85TbRUeK/mQkflOxLWU8PaZlSIaUf9ck2MShNT2NynAZh97ynzAZLg/hC/aDIKtXjb7alse9Tx2qmNqkSW7sUsCgHrmkng5g2bctcJRWcY+CM6QnVYjZRSpcDQG0WIchWdOvVxDvzawU2apG7/YZTSlxChDyj6Qnz6st1wka5nRVBe1Q/mz1y53o8+uwi1MBYFNKAWMTDpNfVHnkHaLtzB2bRrNQb63kTJ4fr3/Sim/3hFfOa0uq4LtxAJjjHwe5YOzgMF56pKynUafRE8uxJf6hzkqu2XotoGpcFdT/N6Esn+0NgC5EW/cUMnzKfkPc+/1aeZZsXv0oipRjQUSGuVn4UCrm5pXNpa92hZPwnuFq3diSKix2IwGwqhr9lKfub8rEUeGGNa7T6Omm3pxaoiKQ2mSJ/xIp+00cepqzhT68+00kKjM+8lFPQoJqu76iEg//2FfEj7sK+DGlgB0HvRmwYn7p5MPGu3anxoS/dmHD9gAskU6WPJJKaKBXOrYfCWFSYlulVZvISKpIOBoHQLT1fQSjFv0xkpG3hWJy7AFPPUavLuaj4/si5NfhwW62zd9NicNE94ndjFB45vhYJtztVStdh+9+yueddWf4clseHk9lSyAs0MODAzOZPOw0mlb5vQzoyshZTdm0y07PXxTxctxxfDTJyk3NWbAuSgnjEmzJD5Vvq3EAmON+BHHD6jmt6dMtEFNJCh9vlvUbveogCJ8Y6z/dOj0Sxpxh/B0njaeDEzrzU2ow0ZF+7FxxDTm5bn434wB7UysF6BdRdq7rWMjNXQvpf00e/r61kjvQAsgVd9J/Uga2M27GDcjk/r5ZzF0dzcfbVJwgJmJLNLpSihoJgPUEELM10ULbKF8052HajTaRX6KmEzOxJSbUq8OW+FFI+X7rpjqHlp7D7TiDq9TBP1KbMeS5NsZra17pzIyFaRxM8zI/ZXgGv7vxLDGRdaX2AuHfHkz+SEcqIqAjIqADOw45GDj5FD4myd+eOMTslRb2pAUrFehHRpLqS14SAMq6+K54vhW39QxCc2Vw1/RCNh/wU5NOwpa0oE4AropvGaR50kqcWsDix7OZMKwyOlTjW40I50yuMFJblcZ2NNtZNeMQzZvUqH4LtY7SbQ0R1B3h7wWuJk19PYel6wvo3q6IwxmBFDlMYDJFcWLJ6UsEIO5NEA8G+gvem9maPl3srP8+jftfNvz+UWyWX9ZRfBDCYl0rJUP6Xp3PimlHadH6qmp7nvW3AJ59W2WNXlIADO6Vy+3d87i6TTFV+qeV72kBaOG1S2ZqgEq5rxuXTm5BhZvMxZak9KDCaDROBUjQiD6ZiBBjvSBE0vuqPfR4tDnp2SY1/Z1kJH1ajbvouEkqDA4P8bDxpf20iwkhKLiKbwZcLggYGGEYv5rUyWJnwsBMRvTJMSx+BWkBhthLx8EK8a/67l/X5PPcW2X1gBoeQI1rJADq1eogvP+nfHYd1Xh2WYh6+AW2JJXeeckSdxdSfKTWW5VQxIibzt/QKXEIcvIFm3dms/lAMCs2Nicn3+u6lVQsnXyE2BbKHghEcC+kfbeRFygDWFMaCkp0uv3hBMV2dehyFbbkkVUBugQAaoIgeWtiPmPmlp2qLjtyKvkQMfE9NOQmXSfgxXF2pt2jUuGLo6KCcxQXn8NZqrFqcysWrWvOsUx/Avwk8+KPM/yGswhTGPjHIh1H6pQAtdL0xTkkf2JcNKl+MJcmAeVMVEpCNbYUAGDRTNoaXcqQh4Y4+eukkrr1uB48cs+eotRZ6QY9Ovzlw2heXav8OYwfeIanf5+Oj38ztLBbVMetzpm+3WFn1NOnlcDsJz2py2WUgHpAEKwE8ZlAf0tKYbqnbynLZpQYLul8VFKcR3FhLsGhEYZ9yDp9DFX1qUpuj+CW6V05mhlgBE6jbszh1QePo/lFIUJ711EYhhKHzi9GnsDlkR4CHE2r3ju6RBWoujUjuVHu7x6Q34K4Wz19arSD58faq2R59UOQnXkcXfegaSYiW11FTQlQb760Mpr5hgTITGUBJITOvu8E1tuzwK8NWohKMWqzVVkPkL1IT95evovLB0CXkX7khT2C4DmgiTrtNyeXEDewFHwioPVUbypre7ZeBGpKQN65TJyOyq7Xxr1hjHqpgzp5D7p2E0KPQLDOpCE+mH6Q3p0LIbAjWmC1sp+x3v2zzvDZlmJVEBlGeqLRV1N06QDEPtgaXY9DynGqOKomHXiti3kP2+kY4wHfFhD9nLfS4zwGJ6delAUsKjxrqEM57ToezLBZHbEbuX2VS1Nmq0J0ZkSIh+9e3EPLcBda6G3gW/3mXYUhrNFWbyQACRqWk/2QQiUVdwFGSKcYVowrAAwK6gYtHwWfpqBKWKdeMJKmC1FxUS5FBeVX5cCW48fAZzuTXaBcoZHMjK8MZgzVUzHHHffekmN4B+EbjQjtU20Z1RtYslZ10uXj2JIXNk4CropviYuxYJy20YMzmWDIdS6Ulb+9p8ur66YQaH4/hPX1rmPfC6deBN1+Xt6VCijGjQtRZZRb5MPQWZ04nBGgvlmPzTIUEqqXhco6zipS/Hr2PjrHlCCaDEKYynoJwOQF2bz7eaECIB5bclIDAFBuLv1WNB5CMkzlAOplSwudcYNLsQ5yEtWszFIrnxw+BMIHgmqESBecXQ656oDqCO+qwiEhK/NoNebViY/8cwcO2gKV7u7A4Xdzva1ws3UVMEJ5hQUPHUcEdkUEVnq8cS9msXZjkVL6e0hPev9CAKgWdi+vJZfKmhtBuzrdweq073RyRy+XcfqGGQnqCmG3Qsj1YCQqQMlOyEoCV0XeUe/pK8ufn5tJqbNSQk7n+nL3nzty9LQ6ebEHl08/zryRVe8k0eN+jdB3+vnopCzcRdPwELQmlcHokCmn2Lbfoa7a9SUjWTVTDarLBijmt6r+Zvmg6OaS+MFOrAOdxslXI/PzUAVpirfDuVVenb8IKnWUUJCfhcdTKdUns/0ZOacDJ7KMcrpyWQOwJXnr3Ocjc9wGEAOUBChJ0JoM8VaZge5jTxr1AYSpfUWbvk4AYuOvwiONluvEEU6G31hK7y7ustMuW93yovdD+nRQAPi2hIJvoeA7cGVeaJvGc3Xqhfk5OOxKLyvp8x3hPPZGWwpKTOp4fsTXNPii7wFZ4icg5eI7rz1H4uNHESHXI/xi8OgSy9Dj3nJ5QFBA1TsDtSUgOv5uhFzZv4eLL/5Sj8WuCsBFsVs5yOVyYC8uMBivauxcbsHsv1t447OW3sGSj3GX3suZv6li/sWR2apa80daRbhIWZiC8P8lIvgaTp910+0PqvIks7Ally3gnbI2AOa4OSCmT/1dAS+MLcLk42NEZkI07Epb+Sl73C7cbielpQ5cpXY8qkNRg3YeDWbG0lhSjhlNlFKQU7Alv97we8GGS1QiFXRoyQ7Cw5ohwm7lp4NOBk7OUHNvx5bUq+rydUiA9QsE/RMnpnJnr8pARAEgNGEA4f0VCE0zEJS6xPjRdW+f3/jsqXbCNZnWdcGm/aG881VL1m+vqAscQdd/z6m3d1zckdcxyhL/E1J2/zThAD07CMMdKuuvvACINdgSh58fALNVRSBNgwM8RgHS0qzUqK+bI52Yjc9OWjRxV6vEXmizitncIpPhzn5KDTF+t6eGcLagvCQm7Eg5D6d8iZzk6kbhQpPXfG62qrbb8CWPpnLX9YVoESNYvDqfhEQjsFqALWnShQBQHuC891R8faQRcqqae0igmxB/nUB/aVxr90iBRxd4PHCu2JfsPF9yCnxQWVwddBwh3kbTEqvW6RrKc7XxZbfRn703nYcHZaE1Hcmjr2TzwdeFKpaYQnriK+cHQNmFmAnheNyxaDIWSSxSxiKMOD8WZAzUeQHqfPtWd92zQaSB3IrQtmJybyHtHVVdvqz3/4m2PoFgnsoOZz+Qyb6zAxk27bQsLNEFgl+RnrT3QgBc+ADMIwPRQlujayFIPRiT+ksQuvAgdDea8KB+pMzF15TJiajsWuHrhVdp3Ahz3AhVeVMv9+lqZ+uBwLJusXwNW/LEmpM2Mhlq3N6uyFutrbGY2AmU36vRESwgPemPdUnbfx4ACmV1abLE0QOhB+Lr2UfaO/VGZ/+ZADRA1P4HQAPA+o8c+i9EKqCqIRS2RQAAAABJRU5ErkJggg==',
        content:'<h1>Dawid home</h1>'
    
    });
    addMarker({
        latz:51.4538,
        longz:-2.5918
    });
    */
    //add marker function
    


    function addMarker(props){
        var marker = new google.maps.Marker({
            position: {lat:  props.latz, lng: props.longz},
            map: map,
            //icon:props.icon
        });

        //check marker
        if(props.icon){
            marker.setIcon(props.icon);
        }
        //check content        
        if(props.content){

            var infoWindow = new google.maps.InfoWindow({
                content:props.content
            })
        
            marker.addListener('click',function(){
                infoWindow.open(map,marker);
            });
        }

    }

  }

  function getPolice(json_police){
      
    $.each(json_police, function(i){
           
        var length = json_police[i].length;

        for(var l = 0;l < length;l++){

          console.log("police",json_police[i][l]);
          
          
          //$(".latestCrime").append("<li class='my-list list-group-item d-flex justify-content-between align-items-center'>% "+json_police[i][l].category+"<span class='badge badge-primary badge-pill'>"+json_police[i][l].month+"</span></div>");
    
        }
     
      });
  }