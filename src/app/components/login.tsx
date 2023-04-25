import { useState , useEffect , FC , useRef , Dispatch , RefObject , ChangeEvent, useContext } from "react";
import GenericButton from "./generic-button";
import { useAuth } from "./authcontext";


interface LoginPromptState {
    isLoginPrompt: boolean;
    setLoginPrompt: Dispatch<React.SetStateAction<boolean>>;
}

interface RegisterDetails {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface LoginDetails {
    email: string;
    password: string;
}

const Login: FC = () => {
    const thisElementRef = useRef<HTMLDivElement>(null);
    const loginRef = useRef<HTMLDivElement>(null);
    const registerRef = useRef<HTMLDivElement>(null);
    const [focusedRef, setFocusedRef] = useState<RefObject<HTMLDivElement | null>>(loginRef);
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [fieldFlag, setFieldFlag] = useState<string>("");

    const { signUp, logIn } = useAuth();
    const [registerDetails, setRegisterDetails] = useState<RegisterDetails>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loginDetails, setLoginDetails] = useState<LoginDetails>({
        email: "",
        password: "",
    });
    const [submittedDetails, setSubmittedDetails] = useState<RegisterDetails | LoginDetails>({
        email: "",
        password: ""
    });

    const fieldStyle: string = "w-full h-[35px] bg-secondary-900 border-[1px] p-1 pl-3 font-light border-secondary-700 text-secondary-200 rounded-none placeholder-secondary-700 focus:outline-none focus:border-primary-500";

    const loginFields = <>
    <input onChange={(event) => handleChange(event)} name="email" type="text" placeholder="Email" value={loginDetails.email} className={fieldStyle} />
    <input onChange={(event) => handleChange(event)} name="password" type="password" placeholder="Password" value={loginDetails.password} className={fieldStyle} />
    </>

    const registerFields = <>
    <div className="w-full h-auto grid grid-cols-2 relative gap-2">
        <input onChange={(event) => handleChange(event)} name="firstName" type="text" placeholder="First Name" value={registerDetails.firstName} className={fieldStyle} />
        <input onChange={(event) => handleChange(event)} name="lastName" type="text" placeholder="Last Name" value={registerDetails.lastName} className={fieldStyle} />
    </div>
    <input onChange={(event) => handleChange(event)} name="email" type="text" placeholder="Email" value={registerDetails.email} className={fieldStyle} />
    <input onChange={(event) => handleChange(event)} name="password" type="password" placeholder="Password" value={registerDetails.password} className={fieldStyle} />
    <input onChange={(event) => handleChange(event)} name="confirmPassword" type="password" placeholder="Confirm Password" value={registerDetails.confirmPassword} className={fieldStyle} />
    </>

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (isLogin) setLoginDetails({...loginDetails, [event.target.name]: event.target.value});
        else setRegisterDetails({...registerDetails, [event.target.name]: event.target.value});
    }

    

    const handleSubmit = async () => {
        if (isLogin) {
            if (loginDetails.email === "" || loginDetails.password === "") {
                setFieldFlag("Please fill out all fields");
                return;
            }
        } else {
            if (registerDetails.firstName === "" || registerDetails.lastName === "" || registerDetails.email === "" || registerDetails.password === "" || registerDetails.confirmPassword === "") {
                setFieldFlag("Please fill out all fields");
                return;
            }
            if (registerDetails.password !== registerDetails.confirmPassword) {
                setFieldFlag("Passwords do not match");
                return;
            }
            if (!(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm).test(registerDetails.email)) {
                setFieldFlag("Invalid email address");
                return;
            }
        }

        setFieldFlag("");

        if (isLogin) {
            logIn(loginDetails.email, loginDetails.password)
            .catch((error: any) => {
                setFieldFlag("Invalid email or password");
            });
        } else {
            signUp(registerDetails.email, registerDetails.password, registerDetails.firstName, registerDetails.lastName)
            .catch((error: any) => {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        setFieldFlag("Email already in use");
                        break;
                    case "auth/invalid-email":
                        setFieldFlag("Invalid email address");
                        break;
                    case "auth/weak-password":
                        setFieldFlag("Password must be at least 6 characters");
                        break;
                    default:
                        setFieldFlag("An error occurred");
                        break;
                }
                console.log(error);
            });
        }
        
    }

    return (
        <div id="login" ref={thisElementRef} className={`w-full h-auto max-w-[500px] text-base overflow-clip`}>
            <div className="flex flex-row w-auto relative gap-2 px-2">
                <div onClick={() => {setFocusedRef(loginRef); setIsLogin(true);}} ref={loginRef} className="text-xl font-normal hover:text-primary-500 transition-colors">Login</div>
                <div onClick={() => {setFocusedRef(registerRef); setIsLogin(false);}} ref={registerRef} className="text-xl font-normal hover:text-primary-500 transition-colors">Register</div>
                <div style={{width: `${focusedRef.current?.offsetWidth}px`, left: `${focusedRef.current?.offsetLeft}px`}} className="absolute h-[2px] bg-primary-500 transition-all bottom-[1px]"></div>
            </div>
            <div className="w-auto h-auto mt-4 flex flex-col gap-2 pl-[8px]">
                { isLogin ? loginFields : registerFields }
                { fieldFlag !== "" ? <div className="text-xs text-[#d64646]">{fieldFlag}</div> : null }
                <GenericButton onClick={() => handleSubmit()}>
                    { isLogin ? "Login" : "Register"}
                </GenericButton>
            </div>
        </div>

    )
}

export default Login;