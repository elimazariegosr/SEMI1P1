import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import {ElementRef,ViewChild } from '@angular/core';
import { Console } from 'console';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['../styles_forms.css']
})

export class FotosComponent implements OnInit {
  albums:any;
  constructor(private router: Router) {
    if(localStorage.getItem("sesion") == null){
      this.router.navigate(['/Users/Login'])
    }
    this.albums= [
      {
        "album":"Fotos de perfil",
        "imagenes":[
          {
            "id":1,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":2,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":3,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":4,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          }
        ]
      },
      {
        "album":"Album 2",
        "imagenes":[
          {
            "id":1,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":2,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":3,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":4,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":5,
            "url":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSExIVFRUWFxcVFhgVGBUVFRYVFRUXGBcYFhUYHSggGB0lGxUWITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLS0tLS0tLy0tLS01LSsvLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAPkAywMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAADBQIEBgEHAAj/xABCEAACAQIEBAQDBQYCCQUAAAABAhEAAwQSITEFQVFhBhMicTKBkRRCobHBByNS0eHwYpMVM0NTcoKSwvE0Y3Oz0v/EABkBAAIDAQAAAAAAAAAAAAAAAAEDAAIEBf/EACwRAAICAQMDAgUEAwAAAAAAAAABAhEDBBIhMUFRIjITYYGRwRRxsfAF4fH/2gAMAwEAAhEDEQA/AGJsVz7OaZItTitm8rsQr+zmu/ZzTIrX2WpvZNiF32au/ZjTELUilHeybELfIqYs1e8qpraqbwbCklmi+RVsWql5dV3k2lHyqkLVXRaqRt1N5NpR8queTV0rUclHcDaU/Irht1c8uuG3U3EootaoZsVfK1EijuJtQvbD1A2KuvQHq1sFIrm2Kgwor0FqIbIlKwniLFNaZvSxziCGM6dhyrdM8A6TpXmPF2fzCGbQtJnUr2rPqJNIdipgOE37BIW8WAPNd/Y1ce4knK5A5AgzFLFtKt0QZHWI/Crt4W8xkmay70kN2tnsgNSBrgFdy1uMtnwevs5ruWuhalIFnATRVrgWpBagbJqampqCrRFFVaDYRRU8tQWiCqhs6FqLVOvqBLBZK7kqdfUQAitQK0c1BqIADChFasmhtVkwWV2Sq9xKttQXFWQGUnShMlW3ShlaumVKWKvraQu0aDnzrzbjvF/NcXPKCHcHqK9H4xgTdtFBoTz6V5rxzhF22RnEKpIWSCY65ay6nc68GnC1XzKKWrjqzqsrzPSgpnInU0xFosmYAi2NXJ0BPIAVU/0i/IgDoIrKuRsuD3VVqQWpKKmFrfZlB5akFogWuhaFkIha6FogWphKFkBqlECURUogWhZKBBKkFooWuxQsNAwtdy0SK7lqWAFlrhWjZa5lqWQAVqJSrGWuEVLJRWNuom3VkihsKNkorMgoLgVadaCy0UyFRqGRVploNwQCemtMRUGBWF8c8ISXvakkBfmeQrZ4niNlEDM4GYSvU/KvO+M8Ye65EnKGEc9BzpGoklAdhi3IS4jF5LPkhZ6k/hApQcP3FPcRhFJ/1knTlEk8hVM4afun/wAVkhKkaJxs97VamBUgKkBW0yEAtTC10CpgULIRC0QLXVWpgULCcAqQFdAqYFCyEQtdC1MCuO4UFmIAAJJOwAEkn5VLIRuMFEnYf3pWffxdYKk2/XDFdTlByxmiAxMZlERqWEUs4pxIYi1cuOwtISUtZmCkpzYTuTpJAMbdawHECmWcPczXAzMcmxzqFJB66DXSKR8W3SNCwUuT0zhHjOzduNZuL5VwNlEMtxWnaGXry0g9a0ttw2x9+RB6EHUV+bL2DvW1zMjemIMxEREEbe/et/4H8fXmPl4hVYIvxqfWEG+aWOcD6jfWDTUxUoHqxFQIqasCJBBHauEVYWCIqDCjEVAiiQAwoTLVkrQytEBWK1nOL8WazcIzeZz8pEJaO5rVZaFewsg5IVj96ATVrIeMcVxrtdDLmQEsFB3WeRnalN9ntFh1EGa9Kx3gjMLl+9dOYtKjkBtrHOsPhuFi+7qXiCdT/hMCsWRU7ka4cr0iXD45lbMN9YnWCa6nELgEb94ptxrgS2VQDVm1BHTvVa3grYADXYbmOlFOLA1JHviipAV1Uogt1osz0QAqYFSCVILUslHAKmBXQtTC0LIRAqQFSC10CoE4BSPxjj0tWCHaAx10n0r6m0kabA9jT8LXmn7SS13EC0CVVLcsw+6pJZztroo05wBzpWWVRryNwxuV+DL+W2JD3nuxbJ8tcigO7f7tMwMQo1Oy9OrbgvB1w1uSuZm1MEEjsATJoHA7BuXScuVLS+XbQbJzb5zueZE86u8Q4P5hDFnBXbKxA+YGhrO5djfjx0t3cYhLV62YhlOh026gg7HtXm+PT7Jj5t6AQR2BBDD6TW6xDvZsMUE3GKgkQDE76gjQdjXnXGcX52KzAsYCqSwAM85AAHONuVWxXfyK6lral3PfvC1ycOF/gJT2WA1sf5bpTbLWa/Z5czWB1Nu05/4sptn/AOoVrMlaUznyjTK5WolKs5ao47iVq0QrtBNHcCiRSueXR7LK4DKQQdq66gAk0dxNpTuOq/EQJ61kPEniw2bmW1DR8QPXsaV+LfEBuM1uAVVtCPi6VkyXuJl3IYk/xAUiee/aPjhrqbI+MlvzZugKG5idJrNYvCJZzEPmadI2ZT+tU8bhlQDK26zm79KhgcUDbgkEgmNKVubVjNqTo+Xy3K5ixgiRrt0miYryQxCWlK8i259/nRvQlhy0hyY+uxqtZxmVQCDp7VaKbKydHuiipihXbmVSegoX25MpM7DUc60mei1mFTbSllu9miOtWDjEDFGYAgazUJRbR5PaioKoYS4szIiPyqdjidssFzDX86DJRfC12K491Rzoa4hCYDA+1ABYC15r4ouKr3rjEDMy20n72U54HPcCvRr94KjOdAATXi3ibGHEXbaWwSEYsxjTMx117KAPnWTUO5Rj9TdpI+mUvoNfCsC2f4sxJnfU70bieOCzmD5TzUTFUEBSCpg/gexol3juHyxcYI2xDbH50hcs38RRA8aTynlhkWWMgBl6CBy/GvNsMc1w3NgXLewLTVvxDxTzWKW9LQM93I2J7dBRcJgYQH/EoPsZrZGOxX5MGSfxJ0uiPZP2bn0sP4UVD7rdv/0rayKw37M2lbp6ss+5zfrNNPGXGhZTywJZhIgxEc6vFrbbM2RetpAOO+K8jvYtAG4DzOkc/nWA4jxm85DXDLKdDtInYxX1zLdDNrnJnMTvS/iFsqMsyaU57pUNUNqsb8P8Y3EdS05FJMDlPLvTjinj03kC21KA6Mx79IrBvZGWWMEUA41gIG1We5qkVVJ2xhiBD5uf51V4hjchOUQWGp6UTFXlYqRMgDnp3pViXYsQRM0nHB3yMyT44LXD7foJdpABiTsTVE4yCAqwoEGefemwsstpWKgAiI50sjOegA+tNg7bFzVJBsOxL5nnLvHKmBvYc6w9JcRfYiNh+dQt4hwAAdKbRSz2vF+K7K55YEDYciRWO4l4pzozWQVdjP1pPjcPaCIwad8ynce9NOH4S06oETcE66SDtFRthSKnDvFuIRiGM7fhRm4211muMCSTIUEx6dga7jfCdwG4pgNbTzBrOZT0qnwlctxQWC6SS2gqm5l0hlguJYi6NHyliVgch0mmOEsYi03mlWuMOQGzctKUY7xIqMvkqAqg688xOpq7wTxRda6GMMYjXSddPnUshrcBjr7T5yZHXXfQzsIq6eLYbDF1dlW4YYjX4n2UNG5/Car8Nt3jee5fQRkz6/wqCYA7wKyNy6xvAEesIzki81z1OROm0eomNqMsijCUvCKxhuko+R3i/EeJu+rIAon92+XyQqsILtBNxmA+HSN4EUr4jdLE3AAATJVRAWeYHShPiCc3WJddgwHMDqKlbcEA/LsQa409VOclKqo7GPTQxppMXYrEFR71keJAvck8ta2mN4a5ANuGAM5SYPsCdD86T38J6mLKVhfvAj6Tvz1rbizQrcmZ82OT9LEGGwYa8F5Df2Alj/fSmin5ZpIHsZH5VR4cxXzW5kFV+ZAn++9WsVcC3VXpb/MqP1/GtEuXRlhwrPQP2YcUVDdRjvlYc9pkCiftAvo9zNbMkAA9pk6/WsX4Wxpt3UIbKScvbtI6cv5VovE9/wDeMcsExP8A551Vyl7SbF7hIlz0GNCNz1pZdcsZG/an9hc6hQpntVJ7vlIfTrqO9GLKyXAnxCsrer31ob3wNY0j8aJir+eJ071QF6JG9OSsRJ0wuDts7E5TrtG1NuH8CuH94xIA6/lV/h2OtMFRcqqoEnnTrxBhb9rIqshBUEkGRB696zTyzbpKjVjxQS3N2J24UziUMRyqhiFVSbTJGhOg1mi4viLWgVR5J37UubG3d8st/Eeh5VIxkSU4gCqBbeYEsWObpl5fpTVOEYeNSQfY0kUsWBmYg/OmT4u6TJApkovsxcXHuhj/AKJdLCYh7e5hiCCCD1Fa/DYBLNm3dcFrZQZQBtm7/Old+2lomy2e3beSATmAblpypZY4nfQ/ZxcN6yRk20XNoPbWnFBvxXiC+aCj5goKkf4GE70o4qodVvW1JULkZW5d5p3xvh1q1hVt3VKX1KkEai4pOpB7fhSTB4wnD3bUiVJYdxyiqdC3UzFu0TuIFMsHiRayONCpBB56UvxbnWCRrUHDMBHz71HyBOj1/hnipcXa8uCLrKymY9XpO3aAaxuDtfvVIAE2tICKGIZZyhQJiDqR1pXwfHGzdtu0hEZc0a+mfV76E1Z4oqWMRobjstzMSguFEtNJ3PpGaTtzpTjKSnDyuPoMjKMZRn4fP1GfEmyhXMqVYeojlOoPuNPnXQuVmTlGZfrqPkf0q1et5lkaqRyMyD1nWlF6+Q5B3SCP+Ft/xj61xoK0dmTSYyt3yNt6o8buZ0OkEafU117n46jsahbV73oRCzDUhRMAHfsPerQxtTTRWc04tMybnKY5gk/9y/jX3EW/eHWNFX5at/21f47gGt3ATAnkGQkGeYB6UqxJJu+xBP0gfrXaguLZx5vt8xlw23m5EwRoBJ100HPT8q2OGJdFLeoQCrHQlSNJ7jakvA8E0Mw9LEEKdCFJEAj2q3w24UTIx0llA3jIcpM92B+lI3qTddh+zalfccWXykGPT2/nSnjxhWi2IOutSHETBRWHYd6rYu69635Sj16z0FGKp2ysnaoyzsdelDw1gO4UkKOpq2cFcBKQZ7azV/AYC2AWvyMpEgbxNanJVwZFBtjOzasgDIitGm2lCv44/wCrCgDtyot/F2zpaBC8jH5118oWImRvWNRSfn9zb1XBlsYhDGddamtxmInQdKaXbAHqbnVTh3DvMux6sg1MbnoBWm/JncGmUmtkB2GsNE0/sYRSoOVtQNzQONgWg9rIVkAjt70mF1v96/yOlD3xsHslR6iLiMwu3GysFlpiG05d6zHEOMW7V4thWkXRDhhoGnl0pTfyNcQEsVgTrO1EvYPDNbZlusrqZQEbwdqiCxhf8RPdFq1e1NosQee0QetD4N6brtchWPI6fFsYqthsbZa3le1mIHxAwwPWq1/EeYczE5vSB3A0qSV8Ei6BY2ypuXB0PLai2MKCJJhf5UbE4fKSW5x7z0qWDsSCGMdByqXwSuSWEw3mA9F602xtktbtXNDGWw5IB9II8tjPZsnKRz50pJKsVBHypzwXEK84dm0uDLrp6/uwduo9yKXKUoPeu38dxkVGS2v++Cxwc+g2iZNtihPPLuv4E/SlfHcOy3BdA9PwkSJI5aVPhuINt2DAIuY22ZQFbMu73WJ3b1tz5czFObPDBiDCMuWAwzHNmlgpgzGkglu/OsWeDx520uH+TZhmp4Um+UZdMRyJgcidvnXeN8c8pfJtMyj4mIOXOR95uvbpFbPF+CcK1sWybrOWXNkJyxJg/DoNN5GgnoKs4XgGBtMzW7YYKqfvLnruE52DeWzfD6QYyjXQ603Hnx41fVickJzdLoeH43FtcbOzSeUnl786b+Hjkab1p8r6IxVspfkJIgk8q9vucVw1kMftJOU5Qt1rbajfKRrtWS41jbeNusbga5Z9CgKzWzChWkH7pzkmY2Ap61DzLbtpeRMNPsluUrF+DljsB2ME/hoPbWg8VQI8yZYSB92djGka6dacXLWGC/u1vo/d7bDuPgpXxvDFwkS0E/wrAMasee3SlYsMozvsac092P5neD4c5ZyZiWkyOU8jT25YL5lAVMoJzLuTGxomAS4yIWVLQVYmd42pPisVCXCxMttlOhG2tLfrndgXpidt41LNohCC3ORJJrItcfEX8imCeu1aHgvBlvyC+gE5v0pphfD1uzfDo+w9QgH5yaYskMbfkW8csleCsvB7hthmCoAIC7T3qOKwNvI3q1HTYU3e6lwlrhIS2dOpqjg+LWvW/lkopJiAc1Jx5ZN2x7jBGSxFm67KotvlIhRBkzzpvwDh97D3GJULpILmfaB1ppa4tiAHxLNbRGBNtWA0A2HvVfF8at3LAdBmuakseVap5G41QlKP16iPxHdvNccOJMTJjQVmU23pjjca9wlyTJ3HYVXscHvMoYJoRI1G1aILbGjHN7pWhnmEDKNROtVcFLAbZhO9GJnQHT8qgcqGdGpa8F35A23MsAAJq1w3KCM8nrVPDvlYk6dquYZ1Alvp3prKRLXEroJJG41Bpfcx5EMdSBAirl6+n8PL60puMjDaO1CKJN8krHE4nTU02tI7r5gdVbTQdqz72+lMMLfCCC2/PoaM4+CsJeT0XinDxiB5tsgG4gzITCEusMpiYIMgHkR0NJ7nCG0Bwg0Iko6CQOR2pr4fsuMGLjMCfOcAf+2VSNOmbN/1VX8V8cbDBGVcxb4hmAjSQDIOp32rkw1Gox5XhxpPxfg6rw4MmNZZtryK73DXLHLhbgBa2YLfdU+vQPBLCPaCOciDcHc3Q64d1QIFCZrcZ8+YsQW1GWFpLjvHGJYQgW330dvkSAPwpHjOM4m58d+4R0zFR9FgV0YPVv3KK+7/ACYZ/pl7dz+y/BtsReSwiG5bsWijBgS4dpDBhCICx+ED61Z4BxXD3Ga35qEmG9KuigBQsDONoUa9682sqCIgAj8RTrgvEbOGtXLk5r7jKq5TCKOZc6anUgdBTJwm16nb+S4/P8lcOSKnaVL5v/n8HpT8OBGdWB9oIPzpXimIOggjXWYbqD/Og8EtMMNZW4JuMhLcmAaWWY2gQK7jGYLrcLAZYMS6gnQzz576+9Jt3TN3G3cuC5a4orWQLisxcTrrlB2JpZi2Sy3mXby5IhF3JHZRqaqca4xasiEHmXGWBmn4urDoN6wmIus7FmbMx3P8u1HFp756JmTNqK4RrMZ4wtyvlWTp94sF0/4Vn86sWfF6uxXIVZgFBn0k8vasPFfRT3psVVRnWpyX1PSr+JuZDauAawWg6gUXh9+2EZ1t7TlB60g4ZjSVUtJJUSTrNaC8bQAA1Makba8orK4JcM2wmnyYbH413ZsxO505AnoK0eI/c4VVVRqstzYnnNVOL4LyyLoUekyQeZpJieJXHYsTEiO0dKdW+qM17LvqDtuSZG3ep27rxoX+RaK+ZCmVo9Lbd6GMW66BoAp3UT0GRQ0G/dPY0E3zPaglomqxiWcizdeWnqOVSz6GeVVgTpRMTcHwj3PvVqK2cS5OlGeB71WsmDR7RXMM0kVGFB8bh8qg5lkiYFA4dYZ3CqRvNFsIzMwSCNgTWl4fw9EtgkAPzIqm6uC2y3ZreDXQnD7txlzG3dMdBmW2PV1EnavOfFmNZm8tmzMjNnPW5JBPtlygex6064pxA2rZRHb1Kz5czZC0EglRoSPLEdJrFYy/ndm6maphwKM3PuxmXK3FQK5FRYUWhNWoyheHoDcUHadeXI860/AOAI+IPmepFGdF53WnRSOg3PLQcjWRolvEOuqu66RozDQ7jQ7dqXOMm+GMxzjH3K+T1XH4u3aU3LtwBm00M+yWh946at/KKzvinjXlDyVP71mDXIM+UqgBUn+LmekntWRxGLe62a4xZoiWM6DYDoO1CZapjw7erNGbVuaaSo7ibsk7meZ3P9KDRbdssQgBJOgABJnsBvVt+CYlWymywJ1+7H/VMT237VooxC+vor46b8t+UR1p1w/AZALrrMmAOn9apKSii0Y2x5gCbdqMqlQBz3gAUE4rUACPal/EcUVlVOkRU7DExpA60qGPcm2x88m1qKQwxNu5ftlFRi2ae1KMZwa4kMY9udaXBYlrVssRp8UzvWYxXFLlxp1OukClY223XQtlrv1GLeHG+z28Q9wZSdFB1FITYBJMjc/nWuwVlmsQ4I1kChNwWzP9as9RBcFfgyYjtYC4dcpiuJwi67AAR86d2+K2z6XP0qVnF2lbKDBiRSnnyeC/woeRSeDujqpYerY+3KrGM4HAlcxP4VbxnFLcRuRQ+FeIdcjfCducVPiZWromzHdCTyXBgjXahHDtMc+9N+Jhmb0nUH0xznqaPhuG4m4dQgYddZ+lPjNtWKcOaGI4Q9uylyFysB8J2PerHlXHQlQCNOYmiYXw7ilysLqlWOtrUitY+BAAC2VtmNSqFvyH60q5/IelE8l8QYmXUbFQUPYq7D+f1pRNaHxzwx7OILEHLdl1OUrrPrEHoTPswqx+zTTFm5AORNAeruiz29Ob61ruo2ZquVGXLjrQia9R47g7V69dW9h0ZyqkOhNt1gkaESGnQwRSG34JtlifNuZILDRA0AE/FJGw6VaK3dATxyRjJr6vQh4bslBYVRbYkqLrKj3CCdTm031XSIBrF8c4Y2GvNZZg0QQw0DKwkGOXMR2o0VcWupRolkFiFAJJ0AAkknYADc0Ga+W4VIZTBBBBG4IMgj50CtnpPA+C/ZLTOQDfKgsdSLatEJp8ySOnSrDYfzElyr8wpQMg6EyNPkaJwDjQxNm27iGDQY0ErEluRB+LpqBTC5hIEwuY6lTojmCZA5AAD8KdjjfEug+dKNxPORg2tXmZkzElmDRKyxJld+vPWp3DcFsSukk/Otbi8WVaIkxMOpysNJ1GijXTnrTDhFnD3zNq2PNXe23pPuoaMw71k1eOeN7krRNO4z4bpmYwHh7P+9vgqsAj+tNbOGw5jyx6V6jenvGOHYlkKeWflH0qknDLy2wPKaQBXKnPLJW/sb1CEXwKeLYU3YUaIOQ50GxatpAUUxvYK8HPoeI6c6o4nh90rORhqJMGY9qMVJra+hVpJ2SN6ZJOv4RS1nUnmatXcPdmPLeOuU1A27n+6b6VdRoq22a6z4SwY18kfWrlvw5hQZ8lJ7137WBuf7/sfga6mPHLU8vfXQ/Q1soUWLfBcKP9in0Bq1Y4fYXUWkH/ACilx4kNgNd+/wCVcOPblpoO/XfaBUog8CW/4U/6RRldB90fQVnftp6nQjkNz2Ov9RFfW8ceRJ594naJ+VQlGmXFAcvyrjY6sycaQvxDb+Jd5PXnr+e+lEOJcSZPQdBJ259aDdEUbC+J+G2sZZNq5p95GHxI+wYD56jmDWE8E8Hu4XHXLN9Sua0WVhORwjDVSd/iGm4r0Xh2Hc+pzpyHeTJ9u1W8fgUugq+aCI9LssSI0AMTBNZMmp4cUaYaflSZ5hxfjafabrz/AIB00IJn8vnVW3x9VC+saHXeCuQgzprLH8JraP8As9wJJJW4Set25r+NUcV4E4ejwbTHYibl39GFaMOrxqoqxeXDl5fBmsN4jXYsoADkk6QGtvqJOpz5YjqKyHH+J+ffa5yhVWd8qjn85Pzr1QeB+HtAGGJ3kh7ukCTMtUD4FwY/2R56ZpjXnNa3mTRkljm+GePqCTABJOwGpPsK1HAPAuKvkNcVrFrmzghyP8KHX5mB71u7Pg/BTBtkHqGYD37VZH7PcEfuv/mP/OsmXWqPHT6f7H49C3y+f7+whxdxcC74ayi5Uy5TcYyS1tWLHTcsSemtStcZdkh/KIO4GYz9QQa0lv8AZ/hAIHmj/nJ/Eg11vAWE6XNjrm/UD8qvD/JQSSbf2DLRz7UY/FcTWZOpzM28tLCJMzpHYRApJxLiqsco9TToq+oz2AnX6VvsV4CwUardI/8AluEfnQV8E4NdER1PIi46k9RKnetC1kZrhiJaaUeqGfgbG3xhVW+HDAkL5mr+WYKzqSIkjXYAbU9+3g86x17wphx968OQJv3f0bbbX86Fc8MWQQC98DYfvru0x1MUltN2XSaXQ1t7iK8ie0/12oT40dffn9Kx93w7bEfv8QNY/wBe8naNCf70qK8AAP8A6jE/50/FEn1TP9DUpB58Gqu4sR8QJnpE6dN96H5p6Cs03CWmBiL+xOhQ7T1TXeoNYcEj7Vf/AMuz/wDmpSDb8DO7cA1EtovaJ1Igd558xXyXTpoNBzPKddapC8Ny3xfWhXNwJ0H41KCMGxmUxl7nUEco7n5Ufzm0za6CBtPz6ClIvydRoPw9qlYdm57bVKBYzGLJSZjltlJM6Gdf72ipeaYDAliNGGhjTmeZ1NUcQxZBIEk6wNoq5w3Bk7SAd+9UnJRVsvGLk6RPDXgwCISI0I125EdK0GCwMHM/qPQ/rUcFhwg21q35tc3NqHLhdDfiwbeX1LZaKhnoHmV8HpFjaLIpTxV/XpvFMBcrP8ZY+YCDyimYeZork9rLFtzpAAH46dam9wNvoOYFU7DsNTU3vEcq6qOaw7okb66RH696PZxuUwSD8jP1qiGBXWoZ+YpeTFGa5LwyOHQerj05Gutj1jnWeXFlaCcYxOnzpP6SI39S/A/v8Rtj3qpcu23WY0Gs96VWb4BJiZoV3FSIHWrR0sUCWpkxkcUrBfWSBMDn313qmbxJIUT7/pQS2m0GgDElJrRGNCHKy9jrKrrKmQpgax296pXbg6abdxJ5UG5ic2tDe9pVipNr/wCGk8/l0qq1wEz+hqNzESIqANGgWQt3u09KlcvDTrVSSNKPbtTvVgBsOwnXWrodSCAKq2MLJp1gsEBrWfNnjAfiwymD4bhTzp3ZMCKCoip5q5WXLKb5OnjxKCpFoXNK75lVc9dzUtIuWfNqQeqoapBqJKLJuUgxzk3KbO+lJMVdAan6ZesRqPYW1v8AKoXrpNVFvVJbldU5pNG5Vw3elRJ1oT3RO9QAYLzNAZq42Kqu96aJA4uxQbt+DpXLd7rQrxBqAJYnHM1RW71qqblfG5RoAe5cg6UN7tBa5pUBdo0Szs867mqDmglqJWywDNX8Nh5qnh6dYWsmfK1wjVgxqXLD4ezFXVNASiVzJybfJ0oRSQXPX2ehV2qpFwoevs9CrtEgYPUg9BFSFAhK9d0rOY+/6qeYjaszj962aVeoyal+kNavVb84UssVYO1dKjnB2v1XZ9ajUTUISd6gr0JqktEBMtXRdoL1A1CHXOtQY1E18dqICLGhua+NcaoA+8yhFq7UaJU//9k="
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/originals/d3/8e/0f/d38e0fc77bce886ce5f2e6d9009e63dd.jpg"
          },
          {
            "id":5,
            "url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSotdgo9lpTKVEPXY2qcUpa0T0BW2jdwAiK2A&usqp=CAU"
          },
          {
            "id":5,
            "url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuP4Pmi8pbtc-SYqWVKyp-wWj8tA37XM_ugA&usqp=CAU"
          },
          {
            "id":5,
            "url":"data:image/jpeg;base64,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"
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":5,
            "url":"https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/prueba/samuel.jpg"
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          },
          {
            "id":5,
            "url":"https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg"
          }
        ]
      }
    
    ]
     

  }

  ngOnInit(): void {
  }
  mostrar(url:string){
    const div  = document.getElementById('rep_ast');
    if(div) div.style.display = 'block';
    console.log(url);
    const div_image = document.getElementById('div_image');
    if(div_image) div_image.innerHTML = "<img src=" + url + " class=\"fadeIn second\"  style=\"max-height: 400px;\">"; 

  }
  ocultar(){
    const div  = document.getElementById('rep_ast');
    if(div) div.style.display = 'none';  
  }
}
