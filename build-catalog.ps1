$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
function Get-Links($Path) {
  $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $Path
  foreach ($match in [regex]::Matches($html, '<a\b[^>]*href=["'']([^"'']+)["''][^>]*>([\s\S]*?)</a>')) {
    $label = $match.Groups[2].Value -replace '<[^>]+>', ' '
    $label = $label -replace '\s+', ' '
    [pscustomobject]@{ url = [System.Net.WebUtility]::HtmlDecode($match.Groups[1].Value); title = ([System.Net.WebUtility]::HtmlDecode($label)).Trim() }
  }
}
function Get-Topic($Title) {
  if ($Title -match 'prostat|TURP') { return 'Prostate health' }
  if ($Title -match 'kidney|urinar|ureth|ureter|cystitis|UTI|bladder|renal|nephro|pyelo') { return 'Kidney & urinary health' }
  if ($Title -match 'infertil|fertil|reproduc|varicocele|epididym|hydrocele|scrot|testic|sperm|semen') { return 'Reproductive health' }
  if ($Title -match 'erect|ejacul|sexual|peyron|priap|balan|peni|phimosis|STD|paraphimosis') { return 'Sexual health' }
  return 'Everyday wellbeing'
}
$catalog = [System.Collections.Generic.List[object]]::new()
$seen = @{}
foreach ($link in (Get-Links 'source/blogs.html')) {
  if ($link.url -notmatch '^https://malehealthonlinekolkata.com/blogs/[^/]+/$' -or !$link.title -or $link.title -match '^Read More' -or $seen.ContainsKey($link.url)) { continue }
  $seen[$link.url] = $true
  $topic = Get-Topic $link.title
  $catalog.Add([pscustomobject]@{ id = 'article-' + $catalog.Count; title = $link.title; url = $link.url; format = 'Article'; topic = $topic; language = 'English'; description = "Explore this patient education article from Dr Basu's clinic."; access = 'Read article' })
}
foreach ($link in (Get-Links 'source/courses.html')) {
  if ($link.url -notmatch '^/courses/[^<]+$' -or $seen.ContainsKey($link.url)) { continue }
  $seen[$link.url] = $true
  $title = ($link.title -split '\s+Dr Prabir Basu|\s+star star')[0].Trim()
  if ($title -match '^MALE HEALTH ESSENTIALS') { $title = 'Male Health Essentials' }
  $language = 'Not specified'
  if ($title -match 'Bengali') { $language = 'Bengali' }
  $catalog.Add([pscustomobject]@{ id = 'course-' + $catalog.Count; title = $title; url = 'https://www.drprabirbasu.com' + $link.url; format = 'Course'; topic = (Get-Topic $title); language = $language; description = 'Learn at your own pace with Dr Prabir Basu. See the course page for access and availability.'; access = 'View course' })
}
$catalog.Add([pscustomobject]@{id='video-std'; title='Understanding sexually transmitted diseases'; url='https://www.youtube.com/watch?v=D7VuTUhphXU&list=PLdjiHb7l7sqNU7NDQQaJ8xI-RsuaOtdVW&index=24'; format='Video'; topic='Sexual health'; language='Not specified'; description='Explore the STD video resource linked from Dr Basu''s website.'; access='Watch on YouTube'})
$catalog.Add([pscustomobject]@{id='video-lectures'; title='Health conversations with Dr Basu'; url='https://www.youtube.com/@docmanbyprabirbasu'; format='Video'; topic='Everyday wellbeing'; language='Not specified'; description='Discover more health education and video lectures on Dr Basu''s channel.'; access='Explore channel'})
$priority = @('Prostate Health Basics', 'Kidney Stones: When Is Surgery Actually Needed?', 'Understanding sexually transmitted diseases', 'Male Health Starter Course in BENGALI', 'Male Infertility: Common Causes, Symptoms, and When to Seek Help', 'Diet and Lifestyle in Male Health (in Bengali)')
$ordered = @()
foreach ($title in $priority) { $ordered += @($catalog | Where-Object { $_.title -eq $title }) }
$ordered += @($catalog | Where-Object { $_.title -notin $priority })
$json = ConvertTo-Json -InputObject @($ordered) -Depth 5
[IO.File]::WriteAllText((Join-Path $PSScriptRoot 'resources.js'), "// Source: drprabirbasu.com and its linked clinic blog. Retrieved 2026-09-17.`nwindow.RESOURCES = $json;", [Text.UTF8Encoding]::new($false))
Write-Output "Catalog built: $($ordered.Count) resources."
$ordered | Group-Object format | Select-Object Name, Count
