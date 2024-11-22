const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // Validar si el usuario existe por email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                msg: 'User/Password are not correct - email'
            });
        }

        // Verificar si el usuario está activo
        if (!user.status) {
            return res.status(400).json({
                msg: 'User/Password are not correct - status: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User/Password are not correct - password'
            });
        }

        // Generar JWT
        const token = await generateJWT(user.id);

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.roleId, // Asegúrate de que estás enviando el roleId
            },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
};
