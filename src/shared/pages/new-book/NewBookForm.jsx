import React, {useMemo, useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import s from './NewBookForm.module.css';
import {useGrabData} from "../../hooks/useGrabData";
import BookService from "../../../API/BookService";
import {toast} from "react-toastify";
import GenresService from "../../../API/CategoryService";
import {TextField, Button, Select, InputLabel, FormControl, MenuItem} from '@mui/material';
import Loader from "../../ui/loader/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {registerLocale} from  "react-datepicker";
import ruLocale from 'date-fns/locale/ru';
registerLocale('ru', ruLocale)

const validationSchema = yup.object({
  title: yup.string().required('Название позиции обязательно'),
  availableCopies: yup.number().min(1, "Минимум 1 копия").required("*"),
  published: yup.date().max(new Date(), 'Дата не может быть в будущем').required('Укажите дату публикации'),
  url: yup.string().required('Ссылка на фото'),
  genres: yup.array().min(1, 'Укажите хотя бы 1 вид жанра'),
  authors: yup.array().min(1, 'Укажите хотя бы 1 автора'),
});

const NewBookForm = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      availableCopies: '',
      published: new Date(),
      url: '',
      genres: [],
      authors: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createBook(values)
      console.log(values)
    },
  });
  const [genres, setGenres] = useState([])
  const [authors, setAuthors] = useState([])

  const [createBook, isDataLoading] = useGrabData(async (attrs) => {
    await BookService.addBook(attrs)
    toast.success(`Книга "${attrs.title}" добавлена.`)
  })

  const [loadRefs, isRefLoad] = useGrabData(async () => {
    const genres = await GenresService.getAllGenres();
    const authors = await BookService.findAllAuthors();
    setGenres(genres)
    setAuthors(authors)
  })

  useMemo(() => {
    loadRefs()
  }, [])

  return (
    <div className={s.formContainer}>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <FormControl fullWidth>
          <TextField
            sx={{marginBottom: "20px"}}
            label="Название книги"
            name="title"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </FormControl>

        <div className={s.fragment}>
          <TextField
            sx={{width: "180px", marginBottom: "20px"}}
            label="Количество копий"
            name="availableCopies"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.availableCopies}
            error={formik.touched.availableCopies && Boolean(formik.errors.availableCopies)}
            helperText={formik.touched.availableCopies && formik.errors.availableCopies}
          />

          <TextField
            sx={{width: "300px", marginBottom: "20px"}}
            label="Фото url"
            name="url"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.url}
            error={formik.touched.url && Boolean(formik.errors.url)}
            helperText={formik.touched.url && formik.errors.url}
          />

          <div className={s.dtPicker}>
            <InputLabel id="dt-picker">Дата публикации</InputLabel>

            <DatePicker
              id={"dt-picker"}
              selected={formik.values.published}
              locale="ru"
              onChange={(date) => {
                // console.log(date)
                formik.setFieldValue("published", date);
              }}
              error={formik.touched.published && Boolean(formik.errors.published)}
              helperText={formik.touched.published && formik.errors.published}
            />
            {formik.touched.published && Boolean(formik.errors.published)
              ? <span>{formik.touched.published && formik.errors.published}</span>
              : ''
            }
          </div>
        </div>
        <FormControl fullWidth>
          <InputLabel id="genres-label">Жанр(-ы)</InputLabel>
          {!isRefLoad ?
            <>
              <Select
                sx={{marginBottom: "20px"}}

                labelId="genres"
                name="genres"
                multiple
                value={formik.values.genres}
                onChange={(event) => {
                  formik.handleChange(event);
                  formik.setFieldValue("genres", event.target.value);
                }}
                error={formik.touched.genres && Boolean(formik.errors.genres)}
                renderValue={(selected) => selected.join(', ')}
              >
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre?.name}>
                    {genre?.name}
                  </MenuItem>
                ))}
              </Select>
            </>
            : <Loader/>
          }
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="authors-label">Автор(-ы)</InputLabel>
          {!isRefLoad ?
            <>
              <Select
                sx={{marginBottom: "20px"}}
                labelId="authors"
                name="authors"
                multiple
                value={formik.values.authors}
                onChange={(event) => {
                  formik.handleChange(event);
                  formik.setFieldValue("authors", event.target.value);
                }}
                error={formik.touched.authors && Boolean(formik.errors.authors)}
                renderValue={(selected) => selected.join(', ')}
              >
                {authors.map((author) => (
                  <MenuItem key={author.id} value={author?.sname + ' ' + author?.fname + ' ' + author?.tname}>
                    {author?.sname + ' ' + author?.fname + ' ' + author?.tname}
                  </MenuItem>
                ))}
              </Select>
            </>
            : <Loader/>
          }
        </FormControl>

        <Button type="submit" color={"primary"} variant={"contained"}>Добавить книгу</Button>
      </form>
    </div>
  );
};

export default NewBookForm;
