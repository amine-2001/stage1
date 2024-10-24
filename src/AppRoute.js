import { Route } from "react-router-dom";
import React from "react";
export function AppRoute({ layout: Layout, component: Component, path: path }) {
    return (
        <Route path={path} render={(props) => {
            return (
                <Layout>
                    <Component location={props.location}></Component>
                </Layout>
            )
        }} />)
}