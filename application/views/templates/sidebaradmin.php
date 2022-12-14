 <!-- Sidebar -->
 <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

     <!-- Sidebar - Brand -->
     <a class="sidebar-brand d-flex align-items-center justify-content-center" href="">
         <div class="sidebar-brand-icon rotate-n-15">
             <i class="fas fa-code"></i>
         </div>
         <div class="sidebar-brand-text mx-3">PromDas</div>
     </a>

     <!-- Divider -->
     <hr class="sidebar-divider">

     <!--Menu Admin-->
     <?php
        if ($title == 'Dashboard') {
            echo "<li class='nav-item active'>";
        } else {
            echo "<li class='nav-item'>";
        }
        ?> <a class="nav-link" href="<?= base_url('Admin'); ?>">
         <i class="fas fa-address-card"></i>
         <span>Dashboard</span></a>
     </li>
     <hr class="sidebar-divider d-none d-md-block">

     <!--Menu IPK-->
     <?php
        if ($title == 'IPK' || $title == 'Edit IPK') {
            echo "<li class='nav-item active'>";
        } else {
            echo "<li class='nav-item'>";
        }
        ?>
     <a class="nav-link" href="<?= base_url('IPK'); ?>">
         <i class="fas fa-graduation-cap"></i>
         <span>Indikator Pencapaian</span></a>
     </li>

     <hr class="sidebar-divider d-none d-md-block">

     <!--Menu Materi-->
     <?php
        if ($title == 'Materi' || $title == 'Edit Materi') {
            echo "<li class='nav-item active'>";
        } else {
            echo "<li class='nav-item'>";
        }
        ?>
     <a class="nav-link" href="<?= base_url('Materi'); ?>">
         <i class="fas fa-book"></i>
         <span>Materi</span></a>
     </li>

     <hr class="sidebar-divider d-none d-md-block">

     <?php
        if ($title == 'Tugas' || $title == 'Edit Tugas') {
            echo "<li class='nav-item active'>";
        } else {
            echo "<li class='nav-item'>";
        }
        ?>
     <a class="nav-link" href="<?= base_url('Tugas'); ?>">
         <i class="fas fa-book-open"></i>
         <span>Tugas</span></a>
     </li>

     <hr class="sidebar-divider d-none d-md-block">

     <?php
        if ($title == 'Test Admin' || $title == 'Edit Soal') {
            echo "<li class='nav-item active'>";
        } else {
            echo "<li class='nav-item'>";
        }
        ?>
     <a class="nav-link" href="<?= base_url('TestAdmin'); ?>">
         <i class="fas fa-pencil-ruler"></i> <span>Test Admin</span></a>
     </li>

     <hr class="sidebar-divider d-none d-md-block">


     <?php
        if ($title == 'Nilai Tes') {
            echo "<li class='nav-item active'>";
        } else {
            echo "<li class='nav-item'>";
        }
        ?>
     <a class="nav-link" href="<?= base_url('NilaiTest'); ?>">
         <i class="fas fa-book-reader"></i>
         <span>Hasil Test User</span></a> </li>

     <hr class="sidebar-divider d-none d-md-block">
     <li class="nav-item">
         <a class="nav-link" href="<?= base_url('auth/logout'); ?>">
             <i class="fas fa-fw fa-sign-out-alt"></i>
             <span>Logout</span></a>
     </li>


     <!-- Divider -->
     <hr class="sidebar-divider d-none d-md-block">

     <!-- Sidebar Toggler (Sidebar) -->
     <div class="text-center d-none d-md-inline">
         <button class="rounded-circle border-0" id="sidebarToggle"></button>
     </div>

 </ul>
 <!-- End  of Sidebar -->