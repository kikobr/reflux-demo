module.exports = function(base){
    return window.artemia.getStore({
        type : 'local',
        base : base
    });
};
