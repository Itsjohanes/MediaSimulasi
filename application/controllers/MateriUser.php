<?php
defined('BASEPATH') or exit('No direct script access allowed');
class MateriUser extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        is_logged_in();
    }



    public function index()
    {
        $data['title'] = 'Materi User';
        //ambil
        $data['user'] = $this->db->get_where('tb_user', ['email' => $this->session->userdata('email')])->row_array();

        $data['ipk'] = $this->db->get('tb_ipk')->result_array();
        $this->db->select('tb_materi.id_materi,tb_materi.nama_materi,tb_materi.link_materi,tb_materi.id_ipk,tb_ipk.nama_ipk,tb_materi.file_materi');
        $this->db->from('tb_materi');
        $this->db->join('tb_ipk', 'tb_materi.id_ipk = tb_ipk.id_ipk');
        $this->db->order_by('tb_ipk.id_ipk', 'ASC');
        $data['materi'] = $this->db->get()->result_array();
        //tampilkan
        $this->load->view('templates/header', $data);
        $this->load->view('templates/sidebaruser', $data);
        $this->load->view('templates/topbar', $data);
        $this->load->view('user/materi', $data);


        $this->load->view('templates/footer');
    }
}
