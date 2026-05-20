<script lang="ts">
  import uniWienLogo from "$lib/assets/uni-wien-logo.svg"
  import imafoLogo from "$lib/assets/imafo-logo.png"
  import fwfLogo from "$lib/assets/fwf-logo.png"
  import acdhLogo from "$lib/assets/acdh-logo.svg"
  import gitHubLogo from "$lib/assets/GitHub_Invertocat_White_Clearspace.svg"
  import NavLink from "./NavLink.svelte";
  import { resolve } from "$app/paths";
</script>

<footer class="bg-brand-200 border-t-2 border-brand-600 text-text pt-5">
  <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,400px))] justify-between gap-4 md:w-3/4 mx-auto py-2 px-10">
   			
        <div class="flex flex-col gap-4">
					<a class="hidden md:inline-flex py-1" href="https://www.univie.ac.at/">
						<img src={uniWienLogo} alt="" class="w-60 h-auto m-auto" />
						<span class="sr-only">University of Vienna</span>
					</a>
					<p>
						<span class="font-semibold">
							<NavLink href="https://judaistik.univie.ac.at/en/">Department of Jewish Studies</NavLink>
						</span>
						<br /> University of Vienna
            <br/> Spitalgasse 2, Hof 7, 1090 Vienna
						<br />
						E:
						<a class="underline decoration-dotted underline-offset-4 hover:no-underline"
							href="mailto:judaistik@univie.ac.at">
              judaistik@univie.ac.at
						</a>
					</p>
				</div>
			
        <div class="flex flex-col gap-4">
					<a class="hidden md:inline-flex py-1" href="https://www.oeaw.ac.at/en/imafo/home">
						<img src={imafoLogo} alt="" class="h-auto w-60 m-auto" />
						<span class="sr-only">Institute for Medieval Research (IMAFO)</span>
					</a>
					<p>
						<span class="font-semibold">
							<NavLink href="https://www.oeaw.ac.at/en/imafo/home"
								>Institute for Medieval Research (IMAFO)</NavLink
							>
						</span>
						<br/> Austrian Academy of Sciences

						<br /> Dominikanerbastei 16, 1010 Vienna
						<br />
						E:
						<a
							class="underline decoration-dotted underline-offset-4 hover:no-underline"
							href="mailto:imafo.office@oeaw.ac.at"
						>
							imafo@oeaw.ac.at
						</a>
					</p>
        </div>

				<div class="flex flex-col gap-4">
					<a class="hidden md:inline-flex py-1" href="https://www.oeaw.ac.at/acdh/">
						<img src={acdhLogo} alt="" class="w-60 h-auto m-auto"/>
						<span class="sr-only"> Austrian Centre for Digital Humanities </span>
					</a>
					<div class="grid gap-2 m-2">
						<p>
							<span class="font-semibold">
								<NavLink href="https://www.oeaw.ac.at/acdh/">ACDH Austrian Centre for Digital Humanities</NavLink
								>
							</span>
							<br />
							Austrian Academy of Sciences
							<br />
							Bäckerstraße 13, 1010 Vienna
							<br />
							T:
							<a
								class="underline decoration-dotted underline-offset-4 hover:no-underline"
								href="tel:+43 1 51581-2200"
							>
								+43 1 51581-2200
							</a>
							<br />
							E:
							<a
								class="underline decoration-dotted underline-offset-4 hover:no-underline"
								href="mailto:acdh@oeaw.ac.at">acdh@oeaw.ac.at</a
							>
						</p>
					</div>
				</div>
   
    <div class="flex flex-col gap-4">
      <span class="hidden md:inline-flex py-1">
        <NavLink  href="https://www.oeaw.ac.at/acdh/">
            <img src={fwfLogo} alt="" class="w-60 h-auto m-auto"/>
        </NavLink>
      </span>
      <span>
        Funded by <span class="font-semibold">Austrian Science Fund (FWF)</span>
        <br/>
        <NavLink href="https://www.fwf.ac.at/forschungsradar/10.55776/P34307">Grant-DOI 10.55776/P34307</NavLink>
      </span>  
  </div>  
</div>
  <div class="bg-brand-600 text-white py-2 text-center">
		&copy; Copyright OEAW |
		<NavLink
			href={resolve("/imprint")}
		>
			Impressum
		</NavLink>
		|
		<NavLink
			href="https://github.com/land-of-israel"
		>
			Code Repo
			<img src={gitHubLogo} alt="" class="inline h-7"/>
		</NavLink>
	</div>
</footer>