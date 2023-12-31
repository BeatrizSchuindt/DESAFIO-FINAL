import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Row, Col, Modal } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import './styles/styles.css';

import IconeSemConexao from '../images/icone-erro-500.png';
import Logo from "../images/logo-definitiva-mt-protege.png";
import ImgPoliciaEsquerda from "../images/policia-esquerda.jpg";
import ImgPoliciaDireita from "../images/policia-direita.jpg";

import { loginPolicial } from "../services/policial-services";

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [error, setError] = useState();
  const [showModalCaiu, setShowModalCaiu] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await loginPolicial(data);
      navigate("/painel-principal");
      window.location.reload(true);
    } catch (error) {
      setError({ message: error.response.data.error });
      if (error.response.status === 500) {
        setShowModalCaiu(true);
      }
    }
  };

  const handleCloseModalCaiu = () => setShowModalCaiu(false);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#00296B",
        overflow: "hidden",
      }}
    >
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-md-3 d-none d-md-block p-0">
            <img
              src={ImgPoliciaEsquerda}
              alt="Descrição da imagem à esquerda"
              className="w-100 h-100 img-fluid"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col-12 col-md-6 p-0 d-flex flex-column align-items-center justify-content-start">
            {/* Logo com altura e largura ajustadas */}
            <img
              src={Logo}
              alt="Logo"
              style={{width:"45%"}}
              className="mt-2" // Largura de 50% e espaço superior de 1rem (4 unidades padrão)
            />

            {/* Frase de boas-vindas responsiva */}
            <p
              className="text-white text-center mt-2"
              style={{ fontSize: "20px", width: "80%" }}
            >
              Seja bem-vindo ao sistema de gestão de ocorrências criminais do
              Estado de Mato Grosso!
            </p>

            {/* Quadrado branco para o menu de login abaixo da logo e da frase */}
            <div
              className="login-box p-4 mt-2 bg-white d-flex flex-column"
              style={{ width: "60%", minHeight: "40%" }}
            >
              {" "}
              {/* Adicionamos a classe bg-white para o fundo branco */}
              <h1 className="text-center">LOGIN</h1>
              <form
                className="mb-3"
                noValidate
                validated={!errors}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-3">
                  {error && <p className="text-center" style={{color: "red", fontSize: "20px"}}>{error.message}</p>}
                  <label
                    htmlFor="matricula"
                    className="form-label"
                    style={{ fontWeight: "Bold" }}
                  >
                    Matrícula
                  </label>
                  <input
                    className="form-control"
                    label="Matricula"
                    type="text"
                    name="matricula_policial"
                    placeholder="Insira seu matrícula"
                    isValid={!errors.matricula_policial}
                    isInvalid={errors.matricula_policial}
                    required
                    {...register("matricula_policial", {
                      required: { message: "Matrícula é obrigatória" },
                      pattern: {
                        value: /^[0-9]{8}$/,
                        message: "Matrícula inválida!",
                      },
                      minLength: {
                        value: 8,
                        message:
                          "A matrícula precisa ter 8 caracteres.",
                      },
                    })}
                  />
                  {errors.matricula_policial && (
                    <p className="hook-form-error">
                      {errors.matricula_policial.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="senha"
                    className="form-label"
                    style={{ fontWeight: "Bold" }}
                  >
                    Senha
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="senha"
                    name="senha"
                    placeholder="Digite sua senha"
                    error={errors.senha}
                    required
                    {...register("senha", {
                      required: { message: "A senha é obrigatória." },
                      minLength: {
                        value: 6,
                        message: "A senha precisa ter no mínimo 6 caracteres.",
                      },
                    })}
                  />
                  {errors.senha && (
                    <p className="hook-form-error">{errors.senha.message}</p>
                  )}
                </div>
                <div className="d-flex justify-content-center p-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isValid}
                    style={{ backgroundColor: "#19A800" }}
                  >
                    ENTRAR
                  </button>
                </div>
              </form>
              <div className="d-flex justify-content-center">
                <div className="d-flex align-items-center">
                  <p className="mb-0" style={{"fontSize": "20px", "marginRight": "5px"}}>Caso você não tenha login, </p>
                  <a href="/cadastro" style={{"fontSize": "20px"}}>
                    CLIQUE AQUI!
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 d-none d-md-block p-0">
            <img
              src={ImgPoliciaDireita}
              alt="Descrição da imagem à direita"
              className="w-100 h-100 img-fluid"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <Modal show={showModalCaiu} onHide={handleCloseModalCaiu}>
        <Modal.Header>
          <Modal.Title>
            <Row className="align-items-center">
              <Col xs="auto">
                <img
                  src={IconeSemConexao}
                  alt="Icone error 500"
                  style={{ width: '64px' }}
                />
              </Col>
              <Col>
                <p className="mb-0">ERRO INTERNO!</p>
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}> O servidor está indisponível no momento...</p>
          <p style={{ fontSize: '1.3rem' }}>Estamos trabalhando para solucionar o mais rápido possível!</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModalCaiu}>
            Entendido
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
