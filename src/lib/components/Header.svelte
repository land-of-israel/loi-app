<script lang="ts">
  import * as NavigationMenu from "$lib/components/ui/navigation-menu";
import { resolve } from "$app/paths";
import Logo from "$lib/assets/loi-logo.png";
</script>
<header>
<nav class="flex items-center gap-6 bg-brand-600 px-4 py-2 text-lg font-bold text-white">
     <div>
      <a href={resolve("/")} >
        <img src={Logo} alt="LOI Logo" class="h-12 rounded-lg"/>
      </a>
    </div>
    

    <NavigationMenu.Root viewport={false}>
      <NavigationMenu.List class="flex items-center gap-4">

       <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            Browse
          </NavigationMenu.Trigger>

          <NavigationMenu.Content>
            <ul class="grid gap-2 p-4 w-48">
              <li>
                <NavigationMenu.Link href={resolve("/passages")}>
                  Passages
                </NavigationMenu.Link>
              </li>

              <li>
                <NavigationMenu.Link href={resolve("/works")}>
                  Works
                </NavigationMenu.Link>
              </li>

              <li>
                <NavigationMenu.Link href={resolve("/authors")}>
                  Authors
                </NavigationMenu.Link>
              </li>

            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
         <NavigationMenu.Link href={resolve("/about")}>
                  Tools
          </NavigationMenu.Link>          
        </NavigationMenu.Item>

        <NavigationMenu.Item>
         <NavigationMenu.Link href={resolve("/about")}>
              Advanced Search
          </NavigationMenu.Link>          
        </NavigationMenu.Item>

         <NavigationMenu.Item>
          <NavigationMenu.Trigger >
            About
          </NavigationMenu.Trigger>

          <NavigationMenu.Content>
            <ul class="grid gap-2 p-4 w-48">
              <li>
                <NavigationMenu.Link href={resolve("/about")}>
                  Project
                </NavigationMenu.Link>
              </li>

              <li>
                <NavigationMenu.Link href={resolve("/about")}>
                  Content of the Database
                </NavigationMenu.Link>
              </li>

              <li>
                <NavigationMenu.Link href={resolve("/about")}>
                  Using the Database
                </NavigationMenu.Link>
              </li>

            </ul>
          </NavigationMenu.Content>
</NavigationMenu.Item>  
      </NavigationMenu.List>
    </NavigationMenu.Root>

    <div class="ml-auto text-2xl">
      <a href={resolve("/")} class="hover:text-accent font-lg text-semibold">
        The Land of Israel in Geonic Times
      </a>
    </div>
  </nav>
</header>