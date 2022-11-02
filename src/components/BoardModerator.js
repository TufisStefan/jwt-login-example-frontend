import { useState, useEffect } from "react"
import eventBus from "../common/EventBus";
import UserService from "../services/user.service";

const BoardModerator = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getModeratorBoard().then((response) => {
            setContent(response.data);
        },
            (error) => {
                const _content = error.message || error.toString();
                setContent(_content);
                if (error.response && error.status === 401) {
                    eventBus.dispatch("logout");
                }
            });
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
}

export default BoardModerator;