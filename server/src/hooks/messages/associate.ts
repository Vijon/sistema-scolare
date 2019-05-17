export default function() {
    return async context => {
        const { app, method, result, params } = context;
        const UserModel = app.services.users.Model;
        
        context.params.sequelize = {
            include: [{ model: UserModel }]
        }
        return context;
    }
}