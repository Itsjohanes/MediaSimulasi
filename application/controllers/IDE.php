<?php
defined('BASEPATH') or exit('No direct script access allowed');





class IDE extends CI_Controller
{
    //constructor

    public function __construct()
    {
        parent::__construct();
        is_logged_in();
    }


    public function index()
    {


        //tampilkan
        //ambil
        $data['title'] = 'IDE';
        $data['user'] = $this->db->get_where('tb_user', ['email' => $this->session->userdata('email')])->row_array();

        $this->load->view('templates/header', $data);
        $this->load->view('templates/sidebaruser', $data);
        $this->load->view('templates/topbar', $data);
        $this->load->view('user/IDE/index.php');
        $this->load->view('templates/footer');
    }
}
