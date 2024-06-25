<?php
if (!isset($current) || empty($current)){
	$current = '';
}
?>
<header class="l-header <?php if (isset($is_simple)) echo 'is-header-simple' ?>">
	<div class="wrp-container">
		<div class="l-header__main">
			<div class="l-header__main__logo">
				<?php
					$html = '<a href="/"><img src="/assets/images/common/logo.svg" alt="" class="fluid-image"></a>';
					if($current == 'home'){
						echo('<h1 id="sitelogo" class="l-header__logo">' . $html . '</h1>');
					}else{
						echo('<p id="sitelogo" class="l-header__logo">' . $html . '</p>');
					}
				?>
			</div>
			<div class="l-header__main__content">
				<a href="#" class="l-header__main__banner">
					<img src="/assets/images/common/banner-header.png" alt="" class="fluid-image">
				</a>
				<div class="l-header__main__bottom">
					<ul class="l-header__main__social">
						<li><a href="★★★"><img src="/assets/images/common/icn-facebook.svg" alt="" class="fluid-image"></a></li>
						<li><a href="★★★"><img src="/assets/images/common/icn-youtube.svg" alt="" class="fluid-image"></a></li>
						<li><a href="★★★"><img src="/assets/images/common/icn-tiktok.svg" alt="" class="fluid-image"></a></li>
					</ul>
					<form action="/" class="frm-search">
						<input type="search" class="form-control" placeholder="Tìm kiếm..." aria-label="Search">
					</form>
				</div>
			</div>
			<?php if (!isset($is_simple)){ ?>
				<ul class="l-header__nav">
					<li<?php if ($current == 'home') echo ' class="current"' ?>><a href="#"><i class="fas fa-home"></i>Trang chủ</a></li>
					<li<?php if ($current == 'tin-chi-carbon') echo ' class="current"' ?>><a href="#">Tín chỉ Carbon</a></li>
					<li<?php if ($current == 'ban-doc-hoi-tra-loi') echo ' class="current"' ?>><a href="#">Bạn đọc hỏi - Bạn đọc trả lời</a></li>
					<li<?php if ($current == 'van-ban-phap-luat') echo ' class="current"' ?>><a href="#">Văn bản - Pháp luật</a></li>
					<li<?php if ($current == 'thong-tin-thi-truong') echo ' class="current"' ?>><a href="#">Thông tin thị trường</a>
						<ul class="l-header__nav__sub">
							<li><a href="★★★">Trong nước</a></li>
							<li><a href="★★★">Quốc tế</a></li>
							<li><a href="★★★">Dự án</a></li>
							<li><a href="★★★">Các tổ chức</a></li>
						</ul>
					</li>
					<li<?php if ($current == 'doanh-nghiep') echo ' class="current"' ?>><a href="#">Doanh nghiệp</a></li>
					<li<?php if ($current == 'chuyen-gia-tu-van') echo ' class="current"' ?>><a href="#">Chuyên gia tư vấn</a></li>
				</ul>
			<?php } ?>
			<div class="nav-global-menu">
				<span class="line b1" aria-hidden="true"></span>
				<span class="line b2" aria-hidden="true"></span>
				<span class="line b3" aria-hidden="true"></span>
			</div>
		</div>
	</div>
</header>