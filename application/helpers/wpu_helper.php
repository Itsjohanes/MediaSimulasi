<?php

function is_logged_in()
{
    $ci = get_instance();
    if (!$ci->session->userdata('email')) {
        redirect('Auth');

        //kalau g ada sessionnya
    } else {
        //kalau ada sessionnya
        $role = $ci->session->userdata('role');
        if ($role == 0) {
            $menuawal =  $_SERVER['REQUEST_URI'];
            $menu = substr($menuawal, 7);
            $tes = strpos($menuawal, '/', 7);
            if (!$tes) {
                $queryMenu = $ci->db->get_where('user_menu', ['role' => $role, 'menu' => $menu])->row_array();
            } else {

                $menuu = substr($menuawal, 7, $tes - 7);
                $queryMenu = $ci->db->get_where('user_menu', ['role' => $role, 'menu' => $menuu])->row_array();
            }

            if ($queryMenu == null) {
                redirect('Auth/blocked');
            }
        }
    }
}
