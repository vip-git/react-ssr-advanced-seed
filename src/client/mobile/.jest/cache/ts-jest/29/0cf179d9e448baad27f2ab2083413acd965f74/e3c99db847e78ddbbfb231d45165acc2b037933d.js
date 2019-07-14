"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const enzyme_1 = require("enzyme");
// Mobile
const content_1 = __importDefault(require("@omega-shared-components/content"));
describe('SharedComponent <SharedComponent />', () => {
    it('Shared Component Mobile renders correctly', () => {
        const sharedComponentMobile = enzyme_1.shallow(React.createElement(content_1.default, null));
        // Interaction demo
        expect(sharedComponentMobile.text()).toEqual('<App />');
        // Snapshot demo
        expect(enzyme_1.shallow).toMatchSnapshot();
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL3ZpcGlud29yay9odGRvY3MvcmVhY3Qtc3NyLWFkdmFuY2VkLXNlZWQvc3JjL2NsaWVudC9tb2JpbGUvX190ZXN0c19fL2NvbnRlbnQtbW9iaWxlLWNvbXBvbmVudC5zcGVjLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0I7QUFDL0IsbUNBQWlDO0FBRWpDLFNBQVM7QUFDVCwrRUFBcUU7QUFFckUsUUFBUSxDQUFDLHFDQUFxQyxFQUFFLEdBQUcsRUFBRTtJQUNwRCxFQUFFLENBQUMsMkNBQTJDLEVBQUUsR0FBRyxFQUFFO1FBQ3BELE1BQU0scUJBQXFCLEdBQUcsZ0JBQU8sQ0FBQyxvQkFBQyxpQkFBcUIsT0FBRyxDQUFDLENBQUM7UUFFakUsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV4RCxnQkFBZ0I7UUFDaEIsTUFBTSxDQUFDLGdCQUFPLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNuQyxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy92aXBpbndvcmsvaHRkb2NzL3JlYWN0LXNzci1hZHZhbmNlZC1zZWVkL3NyYy9jbGllbnQvbW9iaWxlL19fdGVzdHNfXy9jb250ZW50LW1vYmlsZS1jb21wb25lbnQuc3BlYy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgc2hhbGxvdyB9IGZyb20gJ2VuenltZSc7XG5cbi8vIE1vYmlsZVxuaW1wb3J0IFNoYXJlZENvbXBvbmVudE1vYmlsZSBmcm9tICdAb21lZ2Etc2hhcmVkLWNvbXBvbmVudHMvY29udGVudCc7XG5cbmRlc2NyaWJlKCdTaGFyZWRDb21wb25lbnQgPFNoYXJlZENvbXBvbmVudCAvPicsICgpID0+IHtcblx0aXQoJ1NoYXJlZCBDb21wb25lbnQgTW9iaWxlIHJlbmRlcnMgY29ycmVjdGx5JywgKCkgPT4ge1xuXHRcdGNvbnN0IHNoYXJlZENvbXBvbmVudE1vYmlsZSA9IHNoYWxsb3coPFNoYXJlZENvbXBvbmVudE1vYmlsZSAvPik7XG5cblx0XHQvLyBJbnRlcmFjdGlvbiBkZW1vXG5cdFx0ZXhwZWN0KHNoYXJlZENvbXBvbmVudE1vYmlsZS50ZXh0KCkpLnRvRXF1YWwoJzxBcHAgLz4nKTtcblxuXHRcdC8vIFNuYXBzaG90IGRlbW9cblx0XHRleHBlY3Qoc2hhbGxvdykudG9NYXRjaFNuYXBzaG90KCk7XG5cdH0pO1xufSk7XG4iXSwidmVyc2lvbiI6M30=