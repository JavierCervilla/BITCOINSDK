import { Toaster } from "react-hot-toast";
export const ToastProvider = ({ children }) => {
    return (React.createElement(React.Fragment, null,
        children,
        React.createElement(Toaster, null)));
};
