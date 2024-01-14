/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },

    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      height: {
        "256": '256px',
      },
      colors: {
        'primary': "#ECEEFF",
        "coral-red": "#D400FF",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
        "stand-theme": "rgba(31,41,55,1)"
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        'hero': "url('assets/images/collection-background.svg')",
        'card': "url('assets/images/thumbnail-background.svg')",
      },
      screens: {
        "wide": "1440px"
      }
    },
  },
  plugins: [],
}



// <Container component="main" maxWidth="xs">
//   <Box
//     sx={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//     }}
//   >
//     <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
//       <LockOutlinedIcon/>
//     </Avatar>
//     <Typography component="h1" variant="h5">
//       Войти
//     </Typography>
//     <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{mt: 1}}>
//       <TextField
//         fullWidth
//         margin="normal"
//         id="email"
//         name="email"
//         label="Email"
//         value={formik.values.email}
//         onChange={formik.handleChange}
//         error={formik.touched.email && Boolean(formik.errors.email)}
//         helperText={formik.touched.email && formik.errors.email}
//       />
//       <TextField
//         margin="normal"
//         fullWidth
//         name="password"
//         type="password"
//         label="Пароль"
//         id="password"
//         autoComplete="current-password"
//         value={formik.values.password}
//         onChange={formik.handleChange}
//         error={formik.touched.password && Boolean(formik.errors.password)}
//         helperText={formik.touched.password && formik.errors.password}
//       />
//
//       {isError === 403 ? <Alert severity={"error"}>Неверный логин/пароль</Alert> : ''}
//       {/*<Grid container>*/}
//       {/*  <Grid item xs>*/}
//       {/*    <Link href="src/shared/ui/auth/Login/Login" variant="body2">*/}
//       {/*      Забыли пароль?*/}
//       {/*    </Link>*/}
//       {/*  </Grid>*/}
//       {/*</Grid>*/}
//     </Box>
//   </Box>
// </Container>