/**
 * Created by Hualy on 2016/8/12.
 */
const pathName = location.pathname;
if (/^\/(home)?\/?$/.test(patName)) {
    const flexSlider = _id('flexSlider');
    if (flexSlider) {
        const flexControlNav = _id('flexControlNav').children;
        /* eslint-disable no-new */
        new Swipe(flexSlider, {
            autoRestart: true,
            callback: (index) => {
                /* eslint-disable */
                Array.prototype.slice.call(flexControlNav).map((item) => {
                    item.className = '';
                });
                flexControlNav[index].className = 'active';
                /* eslint-enable */
            },
        });
        /* eslint-enable no-new */
    }
}