import * as React from "react";

// context is used to disseminate basic information for API interactions in the application
// it also allows to partially decouple consumer components from props hierarchy
export const ApiContext = React.createContext(null);