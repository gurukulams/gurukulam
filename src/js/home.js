import { html } from "lit-html";

export let home = html`
	<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
		<!-- Brand/logo -->
		<a class="navbar-brand" href="#">
			<img
				src="https://techatpark.com/images/icons/logo.svg"
				width="30"
				height="30"
				class="d-inline-block align-top"
				alt=""
			/>
			GURUKULAM
		</a>
	</nav>

	<section class="side-bar-warp">
		<div class="sidebar-menu small-side-bar flowHide">
			<nav class="">
				<ul class="navbar-nav">
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span class="sidebar-icon"><i class="fas fa-columns"></i></span>
							<span
								class="fadeInRight animated nav-link-name name-hide tax-show"
								>Dashboard</span
							>
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span class="sidebar-icon"
								><i class="far fa-question-circle"></i
							></span>
							<span
								class="fadeInRight animated nav-link-name name-hide tax-show"
								>Creat a Quest</span
							>
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span class="sidebar-icon"
								><img src="images/manage-quests.png" alt=""
							/></span>
							<span
								class="fadeInRight animated nav-link-name name-hide tax-show"
								>Manage Quests</span
							>
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span class="sidebar-icon"
								><img src="images/leaderboards.png" alt=""
							/></span>
							<span
								class="fadeInRight animated nav-link-name name-hide tax-show"
								>Leaderboards</span
							>
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span class="sidebar-icon"
								><img src="images/one-on-one.png" alt=""
							/></span>
							<span
								class="fadeInRight animated nav-link-name name-hide tax-show"
								>One On Ones</span
							>
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span class="sidebar-icon"
								><img src="images/give-kudos.png" alt=""
							/></span>
							<span
								class="fadeInRight animated nav-link-name name-hide tax-show"
								>Give Kudos</span
							>
						</a>
					</li>

					<li class="nav-item">
						<a class="nav-link" href="#">
							<span class="sidebar-icon"
								><img src="images/settings.png" alt=""
							/></span>
							<span
								class="fadeInRight animated nav-link-name name-hide tax-show"
								>Nation Settings</span
							>
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span class="sidebar-icon"
								><img src="images/feedback.png" alt=""
							/></span>
							<span
								class="fadeInRight animated nav-link-name name-hide tax-show"
								>Help/Feedback</span
							>
						</a>
					</li>

					<li class="nav-item">
						<a class="nav-link" href="#">
							<span class="sidebar-icon"
								><img src="images/log-out.png" alt=""
							/></span>
							<span
								class="fadeInRight animated nav-link-name name-hide tax-show"
								>Log Out</span
							>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</section>
`;
