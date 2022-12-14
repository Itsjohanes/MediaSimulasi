<?php
defined('BASEPATH') or exit('No direct script access allowed');

class TestUser extends CI_Controller
{
    //constructor

    public function __construct()
    {
        parent::__construct();
        is_logged_in();
    }


    public function index()
    {
        $data['title'] = 'Test User';
        //ambil
        $data['user'] = $this->db->get_where('tb_user', ['email' => $this->session->userdata('email')])->row_array();

        //tampilkan
        $this->load->view('templates/header', $data);
        $this->load->view('templates/sidebaruser', $data);
        $this->load->view('templates/topbar', $data);
        $this->load->view('user/test', $data);
        $this->load->view('templates/footer');
    }
    public function hasil()
    {
        $data['title'] = 'Test User';
        //ambil
        $data['user'] = $this->db->get_where('tb_user', ['email' => $this->session->userdata('email')])->row_array();

        //tampilkan
        $this->load->view('templates/header', $data);
        $this->load->view('templates/sidebaruser', $data);
        $this->load->view('templates/topbar', $data);
        $this->load->view('user/jawab', $data);
        $this->load->view('templates/footer');
    }
    public function simpanData()
    {
        $data = [

            'email' => $this->session->userdata('email'),
            'nilai' => $this->input->post('nilai'),
        ];
        $this->db->insert('tbl_tes', $data);
        $this->session->set_flashdata('message', '<div class="alert alert-success" role="alert">Selamat Anda Telah Menyelesaikan Tes</div>');
        redirect('TestUser');
    }
}
