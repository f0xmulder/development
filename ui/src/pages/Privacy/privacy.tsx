// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { H2 } from '../../components/Headings/Headings'
import Collapsible from '../../components/Collapsible'
import { Container } from '../../components/design-system-candidates/Grid'
import {
  StyledPageContentCard,
  StyledPageTitle,
  StyledPageDescription,
  StyledList,
  StyledH3,
  StyledP,
} from './styled'

const Privacy = () => {
  return (
    <Container>
      <StyledPageTitle>Privacyverklaring</StyledPageTitle>
      <StyledPageDescription>
        Privacy & security wordt integraal meegenomen in het ontwerp van onze
        applicaties. Het is een van de kernprincipes van Common Ground.
      </StyledPageDescription>
      <StyledPageContentCard>
        <StyledPageContentCard.Body>
          <StyledP>
            Deze privacyverklaring moet worden gelezen in aanvulling op en in
            samenhang met{' '}
            <a href="https://vng.nl/privacyverklaring-vereniging-van-nederlandse-gemeenten">
              de algemene privacyverklaring van de vereniging van Nederlandse
              gemeenten
            </a>
            .
          </StyledP>

          <H2>1. Algemeen</H2>
          <p>
            VNG Realisatie BV verwerkt persoonsgegevens op een zorgvuldige en
            veilige manier in overeenstemming met de geldende wet- en
            regelgeving. In de algemene privacyverklaring zijn de uitgangspunten
            beschreven ten aanzien van de verwerking van persoonsgegevens door
            de VNG Realisatie BV en is informatie te vinden over hoe u uw
            rechten kun uitoefenen. In deze meer specifieke verklaring geven we
            nadere informatie over de doelen en grondslagen, alsmede andere
            belangrijke informatie.
          </p>

          <H2>2. De verantwoordelijke</H2>
          <p>
            VNG Realisatie BV is de verwerkingsverantwoordelijke van de volgende
            verwerkingen:
          </p>

          <H2>3. Verwerken van persoonsgegevens</H2>
          <p>
            Hieronder wordt meer uitleg gegeven over de verwerking, inclusief
            het doel, de grondslag en andere belangrijke informatie.
          </p>
          <StyledH3>Doel developer.overheid.nl</StyledH3>
          <p>
            Het doel van het verwerken van persoonsgegevens voor
            developer.overheid.nl is:
          </p>
          <StyledList>
            <li>
              het faciliteren van een centraal portaal met relevante informatie
              voor developers die werken bij de overheid, in de context van de
              overheid of met data van de overheid;
            </li>
            <li>
              het bevorderen van het ontstaan van een community van developers
              die werken bij de overheid; en
            </li>
            <li>
              het bevorderen van de API Strategie van de Nederlandse overheid.
            </li>
          </StyledList>

          <Collapsible title="Grondslag">
            <p>
              VNG Realisatie BV verwerkt deze persoonsgegevens op basis van
              gerechtvaardigd belang.
            </p>
          </Collapsible>
          <Collapsible title="Categorieën Persoonsgegevens">
            <ul>
              <li>Github-account Naam</li>
              <li>Gebruikersnaam/namen</li>
              <li>Profielafbeelding</li>
              <li>IP-adres</li>
              <li>Gekoppelde apparaten t.b.v. tweefactorauthenticatie</li>
              <li>E-mailadres</li>
            </ul>
          </Collapsible>
          <Collapsible title="Geen ontvangers, geen doorgifte, geen profielen geen geautomatiseerde besluitvorming">
            <p>
              Bij Developer.overheid.nl is geen sprake van ontvangers van
              persoonsgegevens. De persoonsgegevens van Developer.overheid.nl
              worden niet buiten de Europese Economische Ruimte (EER) verwerkt.
              Er worden geen profielen opgesteld. Er vindt geen geautomatiseerde
              besluitvorming plaats.
            </p>
          </Collapsible>
          <Collapsible title="Bewaartermijnen">
            <p>
              De gegevens worden bewaard zolang noodzakelijk voor het doel van
              de verwerking.
            </p>
          </Collapsible>

          <H2>4. Contact</H2>
          <p>
            Mocht u nog vragen hebben, die niet in dit document, noch in het
            document met algemene informatie, worden beantwoord, of als u om een
            andere reden contact wilt opnemen met de gemeente in het kader van
            privacy of gegevensbescherming, neem dan contact op via{' '}
            <a href="mailto:realisatie@vng.nl">realisatie@vng.nl</a>.
          </p>

          <H2>5. Uw rechten uitoefenen en klachten</H2>
          <p>
            Als burger of belanghebbende kunt u uw rechten bij de VNG Realisatie
            BV uitoefenen. Voor meer informatie over het uitoefenen van uw
            rechten, kunt u contact met ons opnemen via{' '}
            <a href="mailto:realisatie@vng.nl">realisatie@vng.nl</a>. Wanneer u
            een klacht heeft over het handelen van de VNG Realisatie BV, dan
            heeft u het recht om klacht in te dienen bij de privacy
            toezichthouder, de Autoriteit Persoonsgegevens.
          </p>

          <H2>6. Wijzigingen</H2>
          <p>Deze privacyverklaring is opgesteld op: 18 november 2020.</p>
        </StyledPageContentCard.Body>
      </StyledPageContentCard>
    </Container>
  )
}

export default Privacy
