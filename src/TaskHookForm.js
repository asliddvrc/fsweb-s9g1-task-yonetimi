import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import "react-toastify/dist/ReactToastify.css";

export default function TaskHookForm(props) {
  const { kisiler, submitFn } = props;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { title: "", description: "", people: [] },
  });

  let names = watch("people");

  const onSubmit = (data) => {
    console.log(data);
    let taskId = nanoid(3);
    submitFn({
      ...data,
      id: taskId,
      status: "yapılacak",
    });
    reset();
    notify(taskId);
  };
  const notify = (id) => {
    toast(`${id} id'li iş eklenmiştir.`);
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            },
          })}
          className="input-text"
          id="title"
          type="text"
          name="title"
        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>
      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="4"
          id="description"
          name="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
        ></textarea>
        {errors.description && (
          <p className="input-error">{errors.description.message}</p>
        )}
      </div>
      <div className="form-line">
        <label className="input-label">Kişiler</label>
        <div>
          {kisiler.map((event) => (
            <label className="input-checkbox" key={event}>
              <input
                type="checkbox"
                name="people"
                value={event}
                checked={names.includes(event)}
                {...register("people", {
                  validate: {
                    birdenFazla: (p) =>
                      p.length >= 1 || "Lütfen en az bir kişi seçin",
                    maxThree: (p) =>
                      p.length <= 3 || "En fazla 3 kişi seçebilirsiniz",
                  },
                })}
              />
              {event}
            </label>
          ))}
          {errors.people && (
            <p
              style={{ display: "block", marginTop: "10px" }}
              className="input-error"
            >
              {errors.people.message}
            </p>
          )}
        </div>
      </div>
      <button
        style={{ marginTop: "20px" }}
        className="submit-button"
        type="submit"
        disabled={!isValid}
      >
        Kaydet
      </button>
    </form>
  );
}
