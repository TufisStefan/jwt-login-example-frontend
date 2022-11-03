import AuthService from "../services/auth.service"


const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div className="container">
            <div className="profile">
                <header className="jumbotron">
                    <h3>
                        {currentUser.username} Profile
                    </h3>
                </header>
                <p>
                    Id: {currentUser.id}
                </p>
                <p>
                    Email: {currentUser.email}
                </p>
                Authorities:
                <ul>
                    {currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
            </div>
        </div>
    );
}

export default Profile;