import type React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage.tsx";

const AppRoutes: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
			</Routes>
		</Router>
	);
};

export default AppRoutes;
