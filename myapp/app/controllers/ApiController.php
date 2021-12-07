<?php

use Phalcon\Http\Response;
use Phalcon\Http\Request;

class ApiController extends \Phalcon\Mvc\Controller
{

    public function onConstruct()
    {
        $this->view->disable();
        $request = new Request();
        $response = new Response();
    }

    public function indexAction()
    {

        if ($this->request->isGet()) {

            $this->response->setStatusCode(200, 'OK');

            $this->response->setJsonContent([
                "status" => true,
                "error" => false,
                "data" => ""
            ]);
        }
        else {

            $this->response->setStatusCode(405, 'Method Not Allowed');
            $this->response->setJsonContent(["status" => false, "error" => "Method Not Allowed"]);
        }
        return  $this->response->send();;
    }


    public function listarAction()
    {
        $emps = Empleados::find();

        if($emps){

            #$returnData = [
            #    "idEmpleado" => $emps->idEmpleado,
            #    "nombreCompleto" => $emps->nombreCompleto,
            #    "cargo" => $emps->cargo,
            #    "departamento" => $emps->departamento
            #];

            $this->response->setStatusCode(200, 'OK');
            $this->response->setJsonContent(["status" => true, "error" => false, "data" => $emps ]);
        }
        else {

            $this->response->setStatusCode(400, 'Bad Request');
            $this->response->setJsonContent(["status" => false, "error" => "Invalid Data."]);
        }
        return $this->response->send();
    }

    public function insertarAction()
    {
        if ($this->request->isPost()) {

            $empleados = new Empleados();

            $post = $this->request->getJsonRawBody();

            $empleados->save([
                'nombreCompleto' => $post->nombreCompleto,
                'cargo' => $post->cargo,
                'departamento' => $post->departamento,
            ]);
        }
        else {

            $this->response->setStatusCode(400, 'Bad Request');
            $this->response->setJsonContent(["status" => false, "error" => "Invalid Data."]);
        }
    }

    public function actualizarAction()
    {
        if ($this->request->isPost()) {

            $empleados = new Empleados();

            $post = $this->request->getJsonRawBody();

            $empleados->save([
                'idEmpleado' => $post->idEmpleado,
                'nombreCompleto' => $post->nombreCompleto,
                'cargo' => $post->cargo,
                'departamento' => $post->departamento,
            ]);

            $this->response->setStatusCode(200, 'OK');

        }
        else {

            $this->response->setStatusCode(400, 'Bad Request');
            $this->response->setJsonContent(["status" => false, "error" => "Invalid Data."]);
        }
        return $this->response->send();
    }

    public function eliminarAction()
    {
        if ($this->request->isPost()) {

            $post = $this->request->getJsonRawBody();

            $empleado = Empleados::findFirst($post->idEmpleado);

            if($empleado){

                $empleado->delete();

                $this->response->setJsonContent([
                    "status" => true,
                    "error" => false,
                    "data" => "Num. Empleado: $post->idEmpleado => Eliminado"
                ]);

                $this->response->setStatusCode(200, 'OK');
            }
            else {
                $this->response->setStatusCode(405, 'Method Not Allowed');
                $this->response->setJsonContent(["status" => false, "error" => "Delete falló"]);
            }



        }
        else {

            $this->response->setStatusCode(400, 'Bad Request');
            $this->response->setJsonContent(["status" => false, "error" => "Invalid Data."]);
        }
        return $this->response->send();
    }

}

