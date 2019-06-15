"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Library
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const instructions = react_native_1.Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
class App extends react_1.Component {
    render() {
        return (react_1.default.createElement(react_native_1.View, { style: styles.container },
            react_1.default.createElement(react_native_1.Text, { style: styles.welcome }, "Welcome to React Native!"),
            react_1.default.createElement(react_native_1.Text, { style: styles.instructions }, "To get started, edit App.js"),
            react_1.default.createElement(react_native_1.Text, { style: styles.instructions }, instructions)));
    }
}
exports.default = App;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL3ZpcGlud29yay9odGRvY3MvcmVhY3Qtc3NyLWFkdmFuY2VkLXNlZWQvc3JjL2NsaWVudC9tb2JpbGUvQXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxVQUFVO0FBQ1YsK0NBQXlDO0FBQ3pDLCtDQUFnRTtBQUVoRSxNQUFNLFlBQVksR0FBRyx1QkFBUSxDQUFDLE1BQU0sQ0FBQztJQUNuQyxHQUFHLEVBQUUsMEJBQTBCLEdBQUcsNkJBQTZCO0lBQy9ELE9BQU8sRUFDTCw0Q0FBNEM7UUFDNUMseUNBQXlDO0NBQzVDLENBQUMsQ0FBQztBQUlILE1BQU0sTUFBTSxHQUFHLHlCQUFVLENBQUMsTUFBTSxDQUFDO0lBQy9CLFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxDQUFDO1FBQ1AsY0FBYyxFQUFFLFFBQVE7UUFDeEIsVUFBVSxFQUFFLFFBQVE7UUFDcEIsZUFBZSxFQUFFLFNBQVM7S0FDM0I7SUFDRCxPQUFPLEVBQUU7UUFDUCxRQUFRLEVBQUUsRUFBRTtRQUNaLFNBQVMsRUFBRSxRQUFRO1FBQ25CLE1BQU0sRUFBRSxFQUFFO0tBQ1g7SUFDRCxZQUFZLEVBQUU7UUFDWixTQUFTLEVBQUUsUUFBUTtRQUNuQixLQUFLLEVBQUUsU0FBUztRQUNoQixZQUFZLEVBQUUsQ0FBQztLQUNoQjtDQUNGLENBQUMsQ0FBQztBQUVILE1BQXFCLEdBQUksU0FBUSxpQkFBcUI7SUFDcEQsTUFBTTtRQUNKLE9BQU8sQ0FDTCw4QkFBQyxtQkFBSSxJQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQiw4QkFBQyxtQkFBSSxJQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTywrQkFBaUM7WUFDNUQsOEJBQUMsbUJBQUksSUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFlBQVksa0NBQW9DO1lBQ3BFLDhCQUFDLG1CQUFJLElBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxZQUFZLElBQUcsWUFBWSxDQUFRLENBQ2xELENBQ1IsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQVZELHNCQVVDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy92aXBpbndvcmsvaHRkb2NzL3JlYWN0LXNzci1hZHZhbmNlZC1zZWVkL3NyYy9jbGllbnQvbW9iaWxlL0FwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gTGlicmFyeVxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFBsYXRmb3JtLCBTdHlsZVNoZWV0LCBUZXh0LCBWaWV3IH0gZnJvbSAncmVhY3QtbmF0aXZlJztcblxuY29uc3QgaW5zdHJ1Y3Rpb25zID0gUGxhdGZvcm0uc2VsZWN0KHtcbiAgaW9zOiAnUHJlc3MgQ21kK1IgdG8gcmVsb2FkLFxcbicgKyAnQ21kK0Qgb3Igc2hha2UgZm9yIGRldiBtZW51JyxcbiAgYW5kcm9pZDpcbiAgICAnRG91YmxlIHRhcCBSIG9uIHlvdXIga2V5Ym9hcmQgdG8gcmVsb2FkLFxcbicgK1xuICAgICdTaGFrZSBvciBwcmVzcyBtZW51IGJ1dHRvbiBmb3IgZGV2IG1lbnUnLFxufSk7XG5cbnR5cGUgUHJvcHMgPSB7fTtcblxuY29uc3Qgc3R5bGVzID0gU3R5bGVTaGVldC5jcmVhdGUoe1xuICBjb250YWluZXI6IHtcbiAgICBmbGV4OiAxLFxuICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRjVGQ0ZGJyxcbiAgfSxcbiAgd2VsY29tZToge1xuICAgIGZvbnRTaXplOiAyMCxcbiAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgIG1hcmdpbjogMTAsXG4gIH0sXG4gIGluc3RydWN0aW9uczoge1xuICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgY29sb3I6ICcjMzMzMzMzJyxcbiAgICBtYXJnaW5Cb3R0b206IDUsXG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50PFByb3BzLCBhbnk+IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8VmlldyBzdHlsZT17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICAgIDxUZXh0IHN0eWxlPXtzdHlsZXMud2VsY29tZX0+V2VsY29tZSB0byBSZWFjdCBOYXRpdmUhPC9UZXh0PlxuICAgICAgICA8VGV4dCBzdHlsZT17c3R5bGVzLmluc3RydWN0aW9uc30+VG8gZ2V0IHN0YXJ0ZWQsIGVkaXQgQXBwLmpzPC9UZXh0PlxuICAgICAgICA8VGV4dCBzdHlsZT17c3R5bGVzLmluc3RydWN0aW9uc30+e2luc3RydWN0aW9uc308L1RleHQ+XG4gICAgICA8L1ZpZXc+XG4gICAgKTtcbiAgfVxufVxuIl0sInZlcnNpb24iOjN9