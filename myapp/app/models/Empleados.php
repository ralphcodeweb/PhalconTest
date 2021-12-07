<?php

class Empleados extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $idEmpleado;

    /**
     *
     * @var string
     */
    public $nombreCompleto;

    /**
     *
     * @var string
     */
    public $cargo;

    /**
     *
     * @var string
     */
    public $departamento;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->setSchema("phalcontest");
        $this->setSource("empleados");
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return 'empleados';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Empleados[]|Empleados|\Phalcon\Mvc\Model\ResultSetInterface
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Empleados|\Phalcon\Mvc\Model\ResultInterface
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
