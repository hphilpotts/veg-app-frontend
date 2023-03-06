# Veg App frontend React SPA        

26/02/23:       
- `create-react-app` used to set up project.        
- Faintly horrifying AI-generated background image added from [_Fotor_](http://fotor.com/).            
- _MUI_ default install completed.      
- Breathtakingly professional logo created by [_LOGO_](https://app.logo.com/).     
- MUI sign up template added.       

27/02/23:       
- `react-router-dom` installed, MUI sign in template also added. _Having some intial difficulty nesting routes within routes (specifically `/auth` for Auth-main component and then onto child components for sign in and sign up.)_.       
- Clearly quite rusty in this regard: quickly realised I should not be using `<Router>` elements in child components... Thanks to the [tutorial here](https://dev.to/tywenk/how-to-use-nested-routes-in-react-router-6-4jhd) I was able to get things working as intended.      

28/02/23:       
- Console error : `Warning: validateDOMNesting(...): <body> cannot appear as a child of <div>.` resolved through changing `<body>` element in `App.js` to a `<div>`.        

01/03/23:       
- Also seeing `Matched leaf route at location "/user/signup" does not have an element. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.` - app seems to be working as intended but I want to resolve this issue as it appears.      
- Firstly, it does not appear to be caused by either the use of a deprecated prop or the presence of a typo as per [stackoverflow](https://stackoverflow.com/questions/69854011/matched-leaf-route-at-location-does-not-have-an-element). Having confirmed version of `react-router-dom` as `6.*`, I checked the relevant documentation and a series of articles without shedding any light on the issue.       
- Eventually - through playing around - I was able to resolve the issue through the use of Outlet and the deletion of unneeded child routes in `App.js` like so:     

```
// App.js:
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='user/*' element={<Auth />}></Route>
    </Routes>
```     

```
// Auth-main.js
<Routes>
  <Route path='signin' element={<SignIn />}></Route>
  <Route path='signup' element={<SignUp />}></Route>
</Routes>
<Outlet />
```     

_Errors/warnings now cleared!_      

--- 

![App in early stages once routing sorted](public/readme/screenshot010323.png)       

---     

- Now working on hooking up signup to the back end. Firstly, I have quickly been able to get a new user `{ userName, emailAddress, password }` from `User-signup` form.     
- Next, Axios installed and `registerHandler` function passed to main auth and then signin as props. A couple of silly mistakes - again thanks to being rusty - for example failing to include `props` when declaring functional components in auth and signin, and passing register handler as a function call rather than a variable...       
- `user` now being passed successfully back to `App.js`:        
![user from User-signup.js showing via console log in App.js](./public/readme/userpassed.png)       

- Next step is linking frontend to backend!     
_Aaaand look who it is!:_     
![CORS error from auth](./public/readme/corserrorauth.png)      

- `"proxy"` added in `package.json`.        
- Issue seen where relative route being used in `Axios.post` (e.g. `localhost:3000/user/auth/signup` rather than `localhost:3000/auth/signup`) - very simple fix of course: adding a `/` in front of post route.       


_Now all working ok!_       

---     
![successful request - frontend browser console](./public/readme/signupsent.png)        

---     

![successful request - backend console](./public/readme/signup200.png)      

---     

- Next step is to handle successful requests by returning a valid token, saving in session storage and then redirecting to the appropriate page.        

06/03/23:       
- Having revisited this after a couple of days off, I immediately spotted that the frontend was returning a message in the response but no token. Backend updated to ensure a 'good' response is returned correctly.        
- Another issue seen: upon first form submit an Axios error is returned, however the second form submit works ok. Subsequent submissions result in alternating 'not working, working' pattern:      

![alternating error / successes](./public/readme/usernotbeingpassed.png)        

_Upon looking more closely, `App.js` is not being passed a `user` object: on first submit this results in a 500 error, on subsequent submits the previously submitted `user` is passed to `registerHandler` (hence the later 400 error code with the message `message : "Email already exists"`)._      

- Looking at console.logs, the issue seems to lie with the fact that the `newUser` state in `User-signup.js` is not updating in time before being sent via `registerHandler`.       
- _I've got a choice here:_ one option is to update newUser using a change handler on each keystroke (meaning a fully updated newUser is ready upon submit button click). The other option - the one that I have gone for - is to use `useEffect`, calling `registerHandler` with the updated `newUser` passed in (within an `if` statement to prevent a `registerHandler` call upon first component load):     

```
  useEffect(() => {
    console.log(newUser)
    if (newUser.userName) {
      registerHandler(newUser)
    }
  })
```

_I've realised that the above solution can be dispensed with and the entire functionality simplified through avoiding using states altogether, instead passing the `user` object from the form directly into `registerHandler`..._

```
  const registerHandler = user => {
    props.register(user)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      userName: data.get('Username'),
      emailAddress: data.get('email'),
      password: data.get('password'),
    }
    registerHandler(user)
  };
```     

