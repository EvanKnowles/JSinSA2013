 require.config({
    shim: {
        "jquery": {
            exports: "$"            
        },

        "requestAnimationFrameShim": {
            exports: "requestAnimationFrame"            
        }

    },
    enforceDefine: true
});

define(["examples", "jCanvas", "jquery", "requestAnimationFrameShim"], function(examples, jCanvas) {
    jCanvas.initialize("canvas");

    var canvas = jCanvas.getCanvas();
    var context = jCanvas.getContext();
    var mouseX, mouseY;
    var exampleIndex = 0;
    var currExample = examples[exampleIndex];

    currExample.setup(canvas, context);

    var loop = function(){
        requestAnimationFrame(loop);
        canvas.width = canvas.width;
        currExample.loop(canvas, context, mouseX, mouseY);
    };

    $('#canvas').mousemove(function(e){
        var pos = $('#canvas').offset();
        mouseX = e.pageX - pos.left;
        mouseY = e.pageY - pos.top;               
    });

    $(document).keydown(function(e) {
        exampleIndex = (exampleIndex+1) % examples.length;
        currExample = examples[exampleIndex];
        currExample.setup(canvas, context);
    });

    loop();
});