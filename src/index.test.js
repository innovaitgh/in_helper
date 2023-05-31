const { setCookie, getCookie, accountHost, shouldRedirect } = require(".")

describe("Cookie", () => {

    beforeEach(() => {
        setCookie("name", "value");
    })

    test("should set cookie", () => {
        expect(document.cookie).toBe("name=value");
    })


    test("should get cookie value", () => {

        const cookie = getCookie("name");

        expect(cookie).toBe("value");
    })

})

test("should have account host", () => {
    expect(accountHost).toBe("http://account.innovaitgh.test")
})


describe("shouldRedirect", () => {

    it("shouldl redirect when r_path is provided", () => {
    
        delete window.location;
    
        window.location = {
            search: `?r_path=http://example.test`,
            replace: jest.fn(),
        };
    
        shouldRedirect({ "token": "token" });
    
        expect(window.location.replace).toHaveBeenCalledWith("http://example.test/users/verify?token=token&r_path=http://example.test");
    
    
    })

    test("should not redirect when r_path is not provided", () => {
    
        delete window.location;
    
        window.location = {
            search: `?`,
            replace: jest.fn(),
        };
    
        const redirect = shouldRedirect({ "token": "token" });
    
        expect(window.location.replace).not.toHaveBeenCalledWith("http://example.test/users/verify?token=token&r_path=http://example.test");
    
        expect(redirect).toBe(false);
    
    })


})